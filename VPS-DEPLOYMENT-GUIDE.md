# Hostinger VPS Node.js Deployment Guide

Complete guide for deploying your Next.js landscaper application on Hostinger VPS without Docker.

## Prerequisites

- Hostinger VPS with Ubuntu 20.04 or higher
- Domain name pointed to your VPS IP
- SSH access to VPS

## Quick Deployment

Use the automated script:

```bash
./deploy-vps-standalone.sh YOUR_VPS_IP yourdomain.com
```

## Manual Deployment Steps

### Step 1: Connect to VPS

```bash
ssh root@your-vps-ip
```

### Step 2: Update System & Install Node.js

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 3: Install PM2 Process Manager

```bash
npm install -g pm2
pm2 --version
```

### Step 4: Install Nginx

```bash
apt install -y nginx
systemctl start nginx
systemctl enable nginx
```

### Step 5: Deploy Application

```bash
# Create app directory
mkdir -p /var/www/landscaper
cd /var/www/landscaper

# Upload your files (using SCP from local machine)
# From your local project directory:
scp -r .next/standalone/* root@your-vps-ip:/var/www/landscaper/
scp -r .next/static root@your-vps-ip:/var/www/landscaper/.next/
scp -r public root@your-vps-ip:/var/www/landscaper/
scp package.json root@your-vps-ip:/var/www/landscaper/
scp server.js root@your-vps-ip:/var/www/landscaper/
scp env.production.template root@your-vps-ip:/var/www/landscaper/.env.production

# Install dependencies
cd /var/www/landscaper
npm install --production
```

### Step 6: Configure Environment

```bash
# Edit environment file
nano /var/www/landscaper/.env.production
```

Add your configuration:
```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
PORT=3001
NODE_ENV=production
```

### Step 7: Setup Nginx Reverse Proxy

```bash
# Create Nginx site configuration
nano /etc/nginx/sites-available/landscaper
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
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
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
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
```

### Step 8: Enable Site & Setup SSL

```bash
# Enable the site
ln -sf /etc/nginx/sites-available/landscaper /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Install Certbot for SSL
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Restart Nginx
systemctl restart nginx
```

### Step 9: Start Application with PM2

```bash
cd /var/www/landscaper

# Start the application
pm2 start server.js --name "landscaper" --env production

# Setup PM2 to start on boot
pm2 startup
pm2 save

# Check status
pm2 status
```

## Database Setup (MySQL)

### Install MySQL

```bash
apt install -y mysql-server
systemctl start mysql
systemctl enable mysql

# Secure MySQL
mysql_secure_installation
```

### Create Database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE landscaper_db;
CREATE USER 'landscaper_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON landscaper_db.* TO 'landscaper_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## Management Commands

### Application Management

```bash
# View application status
pm2 status

# View logs
pm2 logs landscaper

# Restart application
pm2 restart landscaper

# Stop application
pm2 stop landscaper

# Monitor application
pm2 monit
```

### Nginx Management

```bash
# Test configuration
nginx -t

# Reload configuration
systemctl reload nginx

# Restart Nginx
systemctl restart nginx

# View Nginx logs
tail -f /var/log/nginx/error.log
```

### SSL Certificate Renewal

```bash
# Test renewal
certbot renew --dry-run

# Auto-renewal is already configured
# Certificates auto-renew 30 days before expiry
```

## Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs landscaper

# Check if port is in use
netstat -tlnp | grep :3001

# Manually test
cd /var/www/landscaper
node server.js
```

### Nginx Issues

```bash
# Check Nginx status
systemctl status nginx

# Check Nginx error logs
tail -f /var/log/nginx/error.log

# Test configuration
nginx -t
```

### Database Connection Issues

```bash
# Test database connection
mysql -u landscaper_user -p landscaper_db

# Check MySQL status
systemctl status mysql
```

## Performance Optimization

### Enable Gzip Compression

Add to your Nginx configuration:
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_proxied expired no-cache no-store private must-revalidate auth;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
```

### Configure PM2 Cluster Mode

```bash
# Start with multiple instances
pm2 start server.js -i max --name "landscaper" --env production

# Save configuration
pm2 save
```

## Security Recommendations

1. **Firewall Setup**
```bash
ufw allow ssh
ufw allow 'Nginx Full'
ufw enable
```

2. **Regular Updates**
```bash
# Set up automatic security updates
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

3. **Backup Strategy**
```bash
# Backup application
tar -czf /backup/landscaper-$(date +%Y%m%d).tar.gz /var/www/landscaper

# Backup database
mysqldump -u root -p landscaper_db > /backup/landscaper-db-$(date +%Y%m%d).sql
```

## Monitoring

### System Monitoring

```bash
# Check system resources
htop
df -h
free -h

# Check application logs
pm2 logs landscaper --lines 100
```

### Log Rotation

Create log rotation config:
```bash
nano /etc/logrotate.d/landscaper
```

Add:
```
/var/www/landscaper/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reloadLogs
    endscript
}
```

## Deployment Checklist

- [ ] VPS updated and secured
- [ ] Node.js 18+ installed
- [ ] PM2 installed and configured
- [ ] Nginx installed and configured
- [ ] SSL certificate installed
- [ ] Database created and configured
- [ ] Application deployed and running
- [ ] Environment variables configured
- [ ] Firewall configured
- [ ] Backup strategy implemented
- [ ] Monitoring setup

Your Next.js application is now running on Hostinger VPS without Docker! 🚀
