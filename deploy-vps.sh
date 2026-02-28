#!/bin/bash

# Hostinger VPS Deployment Script
# Usage: ./deploy-vps.sh [your-vps-ip] [your-domain]

VPS_IP=${1:-"your-vps-ip"}
DOMAIN=${2:-"yourdomain.com"}
APP_NAME="landscaper"

echo "🚀 Deploying $APP_NAME to Hostinger VPS at $VPS_IP"

# Create deployment package
echo "📦 Creating deployment package..."
npm run build
tar -czf $APP_NAME-deploy.tar.gz \
    .next/standalone/* \
    .next/static \
    public \
    package.json \
    server.js \
    docker-compose.yml \
    nginx.conf \
    env.production.template

# Upload to VPS
echo "📤 Uploading to VPS..."
scp $APP_NAME-deploy.tar.gz root@$VPS_IP:/tmp/

# Deploy on VPS
echo "🔧 Setting up on VPS..."
ssh root@$VPS_IP << EOF
    # Update system
    apt update && apt upgrade -y
    
    # Install Docker if not present
    if ! command -v docker &> /dev/null; then
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        systemctl enable docker
        systemctl start docker
    fi
    
    # Install Docker Compose if not present
    if ! command -v docker-compose &> /dev/null; then
        curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose
    fi
    
    # Create app directory
    mkdir -p /opt/$APP_NAME
    cd /opt/$APP_NAME
    
    # Extract deployment package
    tar -xzf /tmp/$APP_NAME-deploy.tar.gz
    
    # Setup environment
    cp env.production.template .env
    
    # Update domain in nginx config
    sed -i "s/yourdomain.com/$DOMAIN/g" nginx.conf
    
    # Create SSL directory
    mkdir -p ssl
    
    echo "🔒 Setting up SSL certificate..."
    # Install certbot for SSL
    apt install -y certbot python3-certbot-nginx
    
    # Get SSL certificate
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
    
    # Build and start containers
    docker-compose up -d --build
    
    # Cleanup
    rm /tmp/$APP_NAME-deploy.tar.gz
    
    echo "✅ Deployment complete!"
    echo "🌐 Your app is running at: https://$DOMAIN"
EOF

# Cleanup local
rm $APP_NAME-deploy.tar.gz

echo "🎉 Deployment completed successfully!"
echo "📋 Next steps:"
echo "   1. Update database credentials in /opt/$APP_NAME/.env on VPS"
echo "   2. Setup database if needed"
echo "   3. Monitor logs: docker-compose logs -f"
