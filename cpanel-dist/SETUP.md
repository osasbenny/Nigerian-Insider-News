# Nigerian Insider News - cPanel Setup Guide

## Quick Start (5 Minutes)

### Step 1: Upload Files
1. Extract this folder to your cPanel `public_html` directory
2. Or upload to a subdomain folder (e.g., `public_html/news`)

### Step 2: Install Dependencies
```bash
cd /home/username/public_html/nigerian-insider-news
npm install
# or if you prefer pnpm:
pnpm install
```

### Step 3: Create .env File
Create a `.env` file in the root directory with these variables:

```env
# Database Connection
DATABASE_URL=mysql://username:password@localhost:3306/database_name

# Authentication & Security
JWT_SECRET=generate-a-random-string-here-min-32-chars
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# Application Settings
VITE_APP_ID=your-app-id
VITE_APP_TITLE=Nigerian Insider News
VITE_APP_LOGO=https://your-domain.com/logo.png

# Owner Information
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id

# API Keys
BUILT_IN_FORGE_API_KEY=your-api-key
BUILT_IN_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
```

### Step 4: Setup Database
```bash
npm run db:push
```

### Step 5: Start Application
```bash
npm start
```

The app will run on `http://localhost:3000`

---

## cPanel Configuration

### Using cPanel Terminal
1. Log in to cPanel
2. Go to **Terminal** (under Advanced)
3. Navigate to your app directory
4. Run the commands above

### Using SSH
```bash
ssh username@your-domain.com
cd public_html/nigerian-insider-news
npm install
npm run db:push
npm start
```

---

## Web Server Setup

### Apache (.htaccess)
Create a `.htaccess` file in your `public_html` root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>
```

### Nginx (if available)
Configure your Nginx server block:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Process Management (Recommended)

### Using PM2
```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start index.js --name "nigerian-insider-news"

# Save PM2 configuration
pm2 save

# Enable PM2 on startup
pm2 startup
```

### Using nohup (Simple Alternative)
```bash
nohup npm start > app.log 2>&1 &
```

---

## Database Setup

### Create Database in cPanel
1. Go to **MySQL Databases** in cPanel
2. Create a new database (e.g., `nigerian_insider_news`)
3. Create a new user with a strong password
4. Grant all privileges to the user for the database

### Connection String Format
```
mysql://username:password@localhost:3306/database_name
```

### Test Connection
```bash
mysql -h localhost -u username -p database_name
```

---

## File Permissions

Set proper permissions for security:

```bash
# Make directories writable
chmod 755 /home/username/public_html/nigerian-insider-news
chmod 755 /home/username/public_html/nigerian-insider-news/public

# Make files readable
chmod 644 /home/username/public_html/nigerian-insider-news/*.js
chmod 644 /home/username/public_html/nigerian-insider-news/package.json
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Database Connection Error
- Verify DATABASE_URL is correct
- Check MySQL user permissions
- Ensure MySQL is running: `service mysql status`
- Test connection: `mysql -h localhost -u user -p database`

### npm install Fails
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Application Won't Start
- Check logs: `npm start` (see error output)
- Verify Node.js version: `node --version` (should be 18+)
- Check environment variables: `cat .env`
- Verify database connection

### Static Files Not Loading
- Check `public` folder exists
- Verify file permissions (644 for files)
- Check web server configuration
- Ensure asset paths are correct

---

## Monitoring

### View Application Logs
```bash
# If using PM2
pm2 logs nigerian-insider-news

# If using nohup
tail -f app.log
```

### Check Process Status
```bash
# With PM2
pm2 status

# With ps
ps aux | grep "node\|npm"
```

---

## Backup & Maintenance

### Database Backup
```bash
mysqldump -h localhost -u username -p database_name > backup.sql
```

### Code Backup
```bash
tar -czf nigerian-insider-news-backup.tar.gz /path/to/app
```

### Regular Updates
```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit
```

---

## Performance Tips

1. **Enable Gzip Compression** in cPanel
2. **Use CloudFlare** for CDN and caching
3. **Optimize Images** before uploading
4. **Enable Browser Caching** in .htaccess
5. **Monitor Resource Usage** in cPanel

---

## Security Checklist

- [ ] .env file created with strong JWT_SECRET
- [ ] Database user has limited permissions
- [ ] HTTPS enabled (SSL certificate installed)
- [ ] File permissions set correctly (755 dirs, 644 files)
- [ ] Regular backups scheduled
- [ ] PM2 or similar process manager running
- [ ] Firewall configured
- [ ] Regular security updates applied

---

## Support

For issues or questions:
- GitHub: https://github.com/osasbenny/Nigerian-Insider-News
- Designer: https://instagram.com/osas.codes

---

**Last Updated:** April 15, 2026
**Version:** 1.0.0
