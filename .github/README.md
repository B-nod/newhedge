# GitHub Actions CI/CD for Hostinger Deployment

This directory contains GitHub Actions workflows for automated deployment to Hostinger hosting.

## Workflows

### 1. `deploy-hostinger.yml` - Main Deployment
**Triggers:** Push to `main` branch, manual dispatch

**Features:**
- Automated build and deployment to Hostinger
- Support for both FTP and SSH deployment methods
- Health checks after deployment
- Automatic application restart

### 2. `preview-deploy.yml` - Preview Deployments
**Triggers:** Pull requests to `main` branch

**Features:**
- Creates preview deployments for PR testing
- Comments on PR with preview URL
- Uses separate preview environment

### 3. `ci.yml` - Continuous Integration
**Triggers:** Push to `main`/`develop`, pull requests

**Features:**
- Multi-node version testing (18.x, 20.x)
- ESLint and TypeScript checks
- Security audits
- Secret scanning

## Required Secrets

Add these secrets to your GitHub repository settings:

### FTP Deployment (Primary)
```
FTP_SERVER=your-hostinger-server.com
FTP_USERNAME=your-cpanel-username
FTP_PASSWORD=your-ftp-password
FTP_REMOTE_PATH=/home/username/landscaper-app
```

### SSH Deployment (Alternative)
```
SSH_HOST=your-hostinger-server.com
SSH_USERNAME=your-cpanel-username
SSH_PRIVATE_KEY=-----BEGIN OPENSSH PRIVATE KEY-----
(your private key content)
-----END OPENSSH PRIVATE KEY-----
SSH_PORT=22
SSH_REMOTE_PATH=landscaper-app
```

### Application Configuration
```
APP_URL=https://yourdomain.com
PREVIEW_BASE_URL=https://preview.yourdomain.com
```

### Preview Environment (Optional)
```
PREVIEW_DB_HOST=localhost
PREVIEW_DB_USER=username_preview_user
PREVIEW_DB_PASS=preview_password
PREVIEW_DB_NAME=username_preview_db
PREVIEW_FTP_REMOTE_PATH=/home/username/preview-app
```

## Setup Instructions

### 1. Configure Hostinger for SSH Access

1. **Generate SSH key pair:**
   ```bash
   ssh-keygen -t rsa -b 4096 -C "github-actions"
   ```

2. **Add public key to Hostinger:**
   - Go to cPanel → SSH Access
   - Import Public Key or paste the content of `id_rsa.pub`

3. **Add private key to GitHub Secrets:**
   - Copy the content of `id_rsa` (including BEGIN/END lines)
   - Add as `SSH_PRIVATE_KEY` secret

### 2. Configure FTP Access

1. **Get FTP credentials from Hostinger:**
   - cPanel → FTP Accounts
   - Create new FTP account or use existing one

2. **Add credentials to GitHub Secrets:**
   - Add server, username, password, and remote path

### 3. Database Setup

1. **Create production database:**
   - Follow the deployment guide for database setup

2. **Add database credentials to production.env:**
   - Update the file with your actual database credentials

## Deployment Process

### Automatic Deployment
1. Push to `main` branch
2. GitHub Actions triggers automatically
3. Code is built and tested
4. Deployed to Hostinger via FTP/SSH
5. Application is restarted
6. Health check verifies deployment

### Manual Deployment
1. Go to Actions tab in GitHub
2. Select "Deploy to Hostinger" workflow
3. Click "Run workflow"
4. Choose branch and trigger deployment

### Preview Deployments
1. Create a pull request
2. Preview is automatically deployed
3. Comment with preview URL is added to PR
4. Preview is cleaned up when PR is merged/closed

## Monitoring

### Deployment Status
- Check Actions tab in GitHub for deployment status
- View logs for troubleshooting
- Health check results are displayed in workflow run

### Application Monitoring
- Access your application at the configured URL
- Check Hostinger cPanel for application logs
- Monitor resource usage in cPanel

## Troubleshooting

### Common Issues

1. **FTP Connection Failed**
   - Verify FTP credentials in secrets
   - Check if FTP server is accessible
   - Ensure remote path is correct

2. **SSH Connection Failed**
   - Verify SSH key is properly configured
   - Check if SSH access is enabled in cPanel
   - Ensure private key format is correct

3. **Build Failed**
   - Check build logs in GitHub Actions
   - Verify all dependencies are installed
   - Ensure environment variables are set correctly

4. **Application Won't Start**
   - Check application logs in Hostinger
   - Verify database connection
   - Ensure port is not already in use

### Debug Mode

To enable debug logging, add this to your workflow:
```yaml
env:
  DEBUG: true
```

## Security Best Practices

1. **Never commit sensitive data** to repository
2. **Use GitHub Secrets** for all credentials
3. **Rotate secrets regularly**
4. **Monitor workflow runs** for suspicious activity
5. **Use least privilege** for database users

## Maintenance

1. **Update workflows** when dependencies change
2. **Monitor GitHub Actions** usage limits
3. **Clean up old artifacts** and preview deployments
4. **Review and update** secrets periodically

## Support

For issues with:
- **GitHub Actions:** Check GitHub documentation
- **Hostinger deployment:** Refer to DEPLOYMENT_GUIDE.md
- **Application issues:** Check application logs and database connection
