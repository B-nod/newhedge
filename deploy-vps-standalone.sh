#!/bin/bash

# Hostinger VPS Standalone Node.js Deployment Script
# Usage: ./deploy-vps-standalone.sh [your-vps-ip] [your-domain]

VPS_IP=${1:-"your-vps-ip"}
DOMAIN=${2:-"yourdomain.com"}
APP_NAME="landscaper"
NODE_VERSION="18"

echo "🚀 Deploying $APP_NAME to Hostinger VPS (Node.js) at $VPS_IP"

# Create deployment package
echo "📦 Creating deployment package..."
npm run build

# Create deployment directory and copy files
mkdir -p deploy
cp -r .next/standalone/* deploy/
cp -r .next/static deploy/.next/
cp -r public deploy/
cp package.json deploy/
cp server.js deploy/
cp env.production.template deploy/.env.production

# Create tar package
tar -czf $APP_NAME-standalone.tar.gz -C deploy .

# Upload to VPS
echo "📤 Uploading to VPS..."
scp $APP_NAME-standalone.tar.gz root@$VPS_IP:/tmp/

# Deploy on VPS
echo "🔧 Setting up on VPS..."
ssh root@$VPS_IP << EOF
    # Update system
    apt update && apt upgrade -y
    
    # Install Node.js 18 LTS
    if ! command -v node &> /dev/null; then
        curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
        apt-get install -y nodejs
    fi
    
    # Install PM2 for process management
    npm install -g pm2
    
    # Install Nginx
    apt install -y nginx
    
    # Create app directory
    mkdir -p /var/www/$APP_NAME
    cd /var/www/$APP_NAME
    
    # Extract deployment package
    tar -xzf /tmp/$APP_NAME-standalone.tar.gz
    
    # Install dependencies
    npm install --production
    
    # Setup environment file
    echo "⚙️  Configure your environment in /var/www/$APP_NAME/.env.production"
    
    # Create Nginx configuration
    cat > /etc/nginx/sites-available/$APP_NAME << 'NGINX_CONF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificates (will be configured by certbot)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Serve static files directly
    location /_next/static {
        alias /var/www/landscaper/.next/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /static {
        alias /var/www/landscaper/public/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_CONF

    # Update domain in nginx config
    sed -i "s/yourdomain.com/$DOMAIN/g" /etc/nginx/sites-available/$APP_NAME
    
    # Enable site
    ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    
    # Test Nginx configuration
    nginx -t
    
    # Install Certbot for SSL
    apt install -y certbot python3-certbot-nginx
    
    # Get SSL certificate (non-interactive)
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN || echo "⚠️  SSL setup failed, configure manually"
    
    # Start application with PM2
    cd /var/www/$APP_NAME
    pm2 start server.js --name "$APP_NAME" --env production
    
    # Setup PM2 startup
    pm2 startup
    pm2 save
    
    # Restart Nginx
    systemctl restart nginx
    systemctl enable nginx
    
    # Cleanup
    rm /tmp/$APP_NAME-standalone.tar.gz
    
    echo "✅ Deployment complete!"
    echo "🌐 Your app is running at: https://$DOMAIN"
    echo "📊 PM2 status: pm2 status"
    echo "📋 Logs: pm2 logs $APP_NAME"
EOF

# Cleanup local
rm -rf deploy
rm $APP_NAME-standalone.tar.gz

echo "🎉 Deployment completed successfully!"
echo "📋 Next steps:"
echo "   1. SSH into VPS: ssh root@$VPS_IP"
echo "   2. Configure database: nano /var/www/$APP_NAME/.env.production"
echo "   3. Restart app: pm2 restart $APP_NAME"
echo "   4. Monitor: pm2 logs $APP_NAME"
