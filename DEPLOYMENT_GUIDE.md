# Landscaper - cPanel Deployment Guide

Complete step-by-step guide for deploying your Next.js landscaper application to cPanel with MySQL database support.

## Prerequisites

- cPanel hosting account with Node.js support
- SSH access (recommended) or File Manager access
- MySQL database access in cPanel
- Your project built and ready to deploy

## Part 1: Database Setup

### Step 1: Create MySQL Database

1. **Login to cPanel**
2. **Navigate to "MySQL Databases"**
3. **Create a new database:**
   - Database name: `landscaper_db` (or your preferred name)
   - Click "Create Database"
   - Note the full database name (usually prefixed with your username, e.g., `username_landscaper_db`)

### Step 2: Create Database User

1. **In the same MySQL Databases section, create a new user:**
   - Username: `landscaper_user` (or your preferred name)
   - Password: Generate a strong password
   - Click "Create User"
   - **IMPORTANT:** Save these credentials securely!

### Step 3: Grant User Privileges

1. **Add user to database:**
   - Select the user you just created
   - Select the database you just created
   - Click "Add"
2. **Grant ALL PRIVILEGES**
3. Click "Make Changes"

### Step 4: Note Your Database Credentials

You'll need these values later:

```
DB_HOST: localhost (or 127.0.0.1)
DB_USER: username_landscaper_user (full username with prefix)
DB_PASS: your_password
DB_NAME: username_landscaper_db (full database name with prefix)
```

## Part 2: Build Your Application Locally

### Step 1: Update Environment Variables

1. **Copy the environment template:**

   ```bash
   cp env.production.template .env.production
   ```

2. **Edit `.env.production` with your cPanel database credentials:**
   ```
   DB_HOST=localhost
   DB_USER=username_landscaper_user
   DB_PASS=your_actual_password
   DB_NAME=username_landscaper_db
   PORT=3001
   NODE_ENV=production
   ```

### Step 2: Build the Application

```bash
npm run build
```

This will create:

- `.next/` folder with your built application
- `.next/standalone/` folder with the standalone server

## Part 3: Upload Files to cPanel

### Option A: Using SSH (Recommended)

1. **Create a directory for your app:**

   ```bash
   ssh username@yourdomain.com
   mkdir -p ~/landscaper-app
   cd ~/landscaper-app
   ```

2. **Upload files using SCP from your local machine:**
   ```bash
   # From your local project directory
   scp -r .next/standalone/* username@yourdomain.com:~/landscaper-app/
   scp -r .next/static username@yourdomain.com:~/landscaper-app/.next/
   scp -r public username@yourdomain.com:~/landscaper-app/
   scp package.json username@yourdomain.com:~/landscaper-app/
   scp .env.production username@yourdomain.com:~/landscaper-app/
   ```

### Option B: Using cPanel File Manager

1. **Build and create a deployment package locally:**

   ```bash
   npm run build

   # Create a deployment folder
   mkdir deploy
   cp -r .next/standalone/* deploy/
   cp -r .next/static deploy/.next/
   cp -r public deploy/
   cp package.json deploy/
   cp .env.production deploy/

   # Create a zip file
   cd deploy
   zip -r ../landscaper-deploy.zip .
   ```

2. **Upload via cPanel File Manager:**
   - Login to cPanel
   - Open "File Manager"
   - Navigate to your desired directory (e.g., `~/landscaper-app`)
   - Upload `landscaper-deploy.zip`
   - Extract the zip file
   - Delete the zip file after extraction

## Part 4: Setup Node.js Application in cPanel

### Step 1: Access Node.js Setup

1. **Login to cPanel**
2. **Find "Setup Node.js App"** (in Software section)
3. **Click "Create Application"**

### Step 2: Configure Application

Fill in the following details:

- **Node.js version:** Select latest LTS version (18.x or 20.x)
- **Application mode:** Production
- **Application root:** Path to your app (e.g., `landscaper-app`)
- **Application URL:** Your domain or subdomain
- **Application startup file:** `server.js`
- **Environment variables:** Add the following:
  ```
  DB_HOST=localhost
  DB_USER=username_landscaper_user
  DB_PASS=your_password
  DB_NAME=username_landscaper_db
  PORT=3001
  NODE_ENV=production
  ```

### Step 3: Install Dependencies

1. **After creating the app, cPanel will show you a command to run**
2. **Copy the "Enter to the virtual environment" command**
3. **SSH into your server and run:**
   ```bash
   source /home/username/nodevenv/landscaper-app/20/bin/activate
   cd ~/landscaper-app
   npm install --production
   ```

### Step 4: Start the Application

1. **In cPanel Node.js App interface, click "Start App"**
2. **Or via SSH:**
   ```bash
   cd ~/landscaper-app
   node server.js
   ```

## Part 5: Configure Domain/Subdomain

### Option A: Main Domain

If deploying to your main domain:

1. The Node.js app should automatically handle requests
2. Ensure the Application URL in Node.js setup matches your domain

### Option B: Subdomain

1. **Create a subdomain in cPanel:**
   - Go to "Subdomains"
   - Create subdomain (e.g., `app.yourdomain.com`)
   - Point document root to your app directory

2. **Update Node.js app configuration:**
   - Set Application URL to your subdomain

### Option C: Using Reverse Proxy

If you need to run on a specific path, create an `.htaccess` file in your public_html:

```apache
RewriteEngine On
RewriteRule ^landscaper/(.*)$ http://localhost:3001/$1 [P,L]
RewriteRule ^landscaper$ http://localhost:3001/ [P,L]
```

## Part 6: Verify Deployment

### Test Database Connection

1. **SSH into your server:**
   ```bash
   ssh username@yourdomain.com
   cd ~/landscaper-app
   source /home/username/nodevenv/landscaper-app/20/bin/activate
   node -e "const mysql = require('mysql2'); const conn = mysql.createConnection({host:'localhost',user:'username_landscaper_user',password:'your_password',database:'username_landscaper_db'}); conn.connect((err) => {if(err) console.error(err); else console.log('Connected!'); conn.end();});"
   ```

### Test API Endpoints

1. **Visit your domain/API endpoints:**
   - `https://hedgegardening.co.uk//api/testimonials` - Should return JSON
   - `https://hedgegardening.co.uk//` - Should load your homepage

2. **Test testimonial creation:**
   ```bash
   curl -X POST https://hedgegardening.co.uk//api/testimonials \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","message":"Test message"}'
   ```

### Check Application Logs

1. **In cPanel Node.js App interface, click on your app**
2. **View logs for any errors**
3. **Or via SSH:**
   ```bash
   tail -f ~/landscaper-app/logs/app.log
   ```

## Part 7: Troubleshooting

### Application Won't Start

**Check Node.js version:**

```bash
node --version
```

Should be 18.x or higher.

**Check for missing dependencies:**

```bash
cd ~/landscaper-app
npm install --production
```

**Check environment variables:**

```bash
cat .env.production
```

Ensure all values are correct.

### Database Connection Errors

**Verify database credentials:**

- Login to cPanel → MySQL Databases
- Verify database name, username, and privileges

**Test connection manually:**

```bash
mysql -u username_landscaper_user -p username_landscaper_db
```

**Check TypeORM synchronize setting:**

- In `lib/db.ts`, `synchronize: true` will auto-create tables
- For production, consider setting to `false` and running migrations

### Port Already in Use

**Change the PORT in environment variables:**

```
PORT=3002
```

**Restart the application** in cPanel Node.js interface.

### Memory Issues

Your cPanel shows 367MB/2GB usage. Monitor with:

```bash
top
```

If memory usage is high:

- Reduce `synchronize` logging in production
- Optimize database queries
- Consider upgrading hosting plan

### 502 Bad Gateway

**Check if app is running:**

```bash
ps aux | grep node
```

**Restart the application:**

- Via cPanel Node.js interface: Stop → Start
- Or kill and restart manually

### Static Files Not Loading

**Ensure public folder is uploaded:**

```bash
ls -la ~/landscaper-app/public
```

**Check .next/static folder:**

```bash
ls -la ~/landscaper-app/.next/static
```

## Part 8: Maintenance

### Updating Your Application

1. **Build locally:**

   ```bash
   npm run build
   ```

2. **Upload new files** (same as Part 3)

3. **Restart application** in cPanel Node.js interface

### Monitoring Resources

**Check your cPanel stats regularly:**

- Processes: 60/100 (keep below 80)
- Memory: 367MB/2GB (keep below 1.5GB)
- Disk: Monitor database growth

### Database Backups

1. **In cPanel, go to "Backup"**
2. **Download database backups regularly**
3. **Or use phpMyAdmin to export**

### Logs

**Application logs location:**

```
~/landscaper-app/logs/
```

**Check for errors regularly:**

```bash
tail -100 ~/landscaper-app/logs/app.log
```

## Part 9: Security Recommendations

### 1. Secure Environment Variables

- Never commit `.env.production` to Git
- Use strong database passwords
- Rotate credentials periodically

### 2. Enable HTTPS

- Use cPanel SSL/TLS to install SSL certificate
- Force HTTPS in `.htaccess` (already configured)

### 3. Database Security

- Use strong passwords
- Limit database user privileges to only necessary permissions
- Regular backups

### 4. Update Dependencies

```bash
npm audit
npm audit fix
```

### 5. Monitor Access

- Check cPanel access logs
- Monitor for unusual API activity

## Quick Reference Commands

```bash
# SSH into server
ssh username@yourdomain.com

# Navigate to app
cd ~/landscaper-app

# Activate Node.js environment
source /home/username/nodevenv/landscaper-app/20/bin/activate

# Install dependencies
npm install --production

# Start app manually
node server.js

# Check running processes
ps aux | grep node

# View logs
tail -f logs/app.log

# Test database connection
mysql -u username_landscaper_user -p username_landscaper_db
```

## Support

If you encounter issues:

1. Check application logs in cPanel Node.js interface
2. Verify all environment variables are set correctly
3. Ensure database credentials are accurate
4. Check cPanel resource usage
5. Contact your hosting provider for Node.js-specific support

---

**Deployment Checklist:**

- [ ] MySQL database created
- [ ] Database user created with privileges
- [ ] Database credentials saved
- [ ] Application built locally (`npm run build`)
- [ ] `.env.production` configured with correct credentials
- [ ] Files uploaded to cPanel
- [ ] Node.js app configured in cPanel
- [ ] Dependencies installed (`npm install --production`)
- [ ] Application started
- [ ] Domain/subdomain configured
- [ ] API endpoints tested
- [ ] Database connection verified
- [ ] SSL certificate installed
- [ ] Backups configured

## Part 10: CI/CD with GitHub Actions (Recommended)

### Overview

Automate your deployment process using GitHub Actions for seamless, continuous deployment to Hostinger. This eliminates manual upload steps and ensures consistent deployments.

### Prerequisites

- GitHub repository with your code
- Hostinger hosting with FTP/SSH access
- Database already configured (see Part 1)

### Step 1: Setup GitHub Secrets

1. **Go to your GitHub repository**
2. **Navigate to Settings → Secrets and variables → Actions**
3. **Add the following secrets:**

#### For FTP Deployment:

```
FTP_SERVER=your-hostinger-server.com
FTP_USERNAME=your-cpanel-username
FTP_PASSWORD=your-ftp-password
FTP_REMOTE_PATH=/home/username/landscaper-app
```

#### For SSH Deployment (Alternative):

```
SSH_HOST=your-hostinger-server.com
SSH_USERNAME=your-cpanel-username
SSH_PRIVATE_KEY=-----BEGIN OPENSSH PRIVATE KEY-----
(your private key content)
-----END OPENSSH PRIVATE KEY-----
SSH_PORT=22
SSH_REMOTE_PATH=landscaper-app
```

#### Application Configuration:

```
APP_URL=https://yourdomain.com
```

### Step 2: Configure SSH Access (Optional but Recommended)

1. **Generate SSH key pair:**

   ```bash
   ssh-keygen -t rsa -b 4096 -C "github-actions"
   ```

2. **Add public key to Hostinger:**
   - Login to cPanel
   - Go to "SSH Access"
   - Click "Import Key" or "Manage Keys"
   - Add your public key content

3. **Add private key to GitHub:**
   - Copy the entire content of your private key file
   - Add as `SSH_PRIVATE_KEY` secret

### Step 3: Deploy Automatically

#### Method 1: Push to Main Branch

```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

The workflow will automatically:

- Build your application
- Run tests and linting
- Deploy to Hostinger
- Restart the application
- Perform health checks

#### Method 2: Manual Deployment

1. **Go to Actions tab in GitHub**
2. **Select "Deploy to Hostinger" workflow**
3. **Click "Run workflow"**
4. **Choose branch and trigger deployment**

### Step 4: Preview Deployments

When you create a pull request:

1. A preview deployment is automatically created
2. GitHub comments on your PR with the preview URL
3. Test your changes before merging to main

### Step 5: Monitor Deployments

#### Check Deployment Status:

- **GitHub Actions tab:** View workflow runs and logs
- **Health checks:** Automatic verification after deployment
- **Error notifications:** Failed deployments trigger alerts

#### Troubleshooting:

1. **Check workflow logs** in GitHub Actions
2. **Verify secrets** are correctly configured
3. **Check Hostinger logs** via cPanel
4. **Test database connection** manually

### CI/CD Workflow Features

#### Automated Testing:

- ESLint checks
- TypeScript compilation
- Security audits
- Multi-node version testing

#### Deployment Options:

- **FTP:** Simple file transfer
- **SSH:** More secure with application control
- **Preview environments:** Isolated testing

#### Safety Features:

- **Rollback capability:** Previous deployment backed up
- **Health checks:** Verifies application is running
- **Secret scanning:** Detects exposed credentials

### Benefits of CI/CD

1. **Consistency:** Same deployment process every time
2. **Speed:** Deployments in minutes, not hours
3. **Reliability:** Automated testing catches issues early
4. **Traceability:** Full deployment history and logs
5. **Collaboration:** Preview deployments for team testing

### Migration from Manual to CI/CD

If you're currently deploying manually:

1. **Backup current deployment**
2. **Set up GitHub secrets**
3. **Test with a non-critical branch**
4. **Gradually migrate to automated deployments**
5. **Remove manual deployment steps**

### Advanced Configuration

#### Custom Environment Variables:

Add to your workflow:

```yaml
env:
  CUSTOM_VAR: value
  API_ENDPOINT: ${{ secrets.API_URL }}
```

#### Conditional Deployments:

```yaml
- name: Deploy to staging
  if: github.ref == 'refs/heads/develop'
  run: echo "Deploying to staging"
```

#### Database Migrations:

```yaml
- name: Run database migrations
  run: npm run migrate
```

---

**Deployment Checklist:**

- [ ] GitHub repository created
- [ ] CI/CD workflows configured
- [ ] GitHub secrets added
- [ ] SSH/FTP access configured
- [ ] Database credentials set
- [ ] Test deployment successful
- [ ] Health checks passing
- [ ] Team trained on new process

Good luck with your automated deployments! 🚀

---

## Part 11: Maintenance and Monitoring

### Regular Tasks

#### Weekly:

- [ ] Check GitHub Actions usage
- [ ] Review deployment logs
- [ ] Monitor application performance
- [ ] Update dependencies if needed

#### Monthly:

- [ ] Rotate secrets and passwords
- [ ] Review and update workflows
- [ ] Clean up old artifacts
- [ ] Backup database

#### Quarterly:

- [ ] Security audit
- [ ] Performance optimization
- [ ] Update Node.js version
- [ ] Review hosting plan

### Monitoring Tools

#### GitHub Actions:

- Workflow run history
- Usage statistics
- Error tracking

#### Hostinger:

- Resource usage monitoring
- Application logs
- Database performance

#### Application Monitoring:

- Error tracking
- Performance metrics
- User analytics

### Emergency Procedures

#### Deployment Rollback:

1. Identify the last successful deployment
2. Revert to the previous commit
3. Trigger redeployment
4. Verify functionality

#### Database Issues:

1. Check database connection
2. Review recent changes
3. Restore from backup if needed
4. Update connection strings

#### Downtime Response:

1. Check GitHub Actions status
2. Review Hostinger logs
3. Restart application if needed
4. Communicate with stakeholders

---

## Quick Reference Commands

```bash
# SSH into server
ssh username@yourdomain.com

# Navigate to app
cd ~/landscaper-app

# Activate Node.js environment
source /home/username/nodevenv/landscaper-app/20/bin/activate

# Install dependencies
npm install --production

# Start app manually
node server.js

# Check running processes
ps aux | grep node

# View logs
tail -f logs/app.log

# Test database connection
mysql -u username_landscaper_user -p username_landscaper_db

# GitHub CLI commands
gh workflow list
gh workflow run "Deploy to Hostinger"
gh run list
```

## Support

If you encounter issues:

### CI/CD Issues:

1. Check GitHub Actions logs
2. Verify secrets configuration
3. Review workflow syntax
4. Check GitHub Actions status page

### Hostinger Issues:

1. Check application logs in cPanel Node.js interface
2. Verify all environment variables are set correctly
3. Ensure database credentials are accurate
4. Check cPanel resource usage
5. Contact Hostinger support for Node.js-specific issues

### Application Issues:

1. Review code changes in recent commits
2. Check database schema and data
3. Test API endpoints manually
4. Review browser console for errors

---

**Final Deployment Checklist:**

- [ ] MySQL database created and configured
- [ ] Database user created with privileges
- [ ] Database credentials saved securely
- [ ] CI/CD workflows configured
- [ ] GitHub secrets added
- [ ] SSH/FTP access configured
- [ ] Application builds successfully
- [ ] Automated deployment tested
- [ ] Health checks implemented
- [ ] Team training completed
- [ ] Monitoring setup
- [ ] Backup procedures documented
- [ ] Emergency response plan created

Congratulations! You now have a fully automated CI/CD pipeline for your Next.js application on Hostinger! 🎉
