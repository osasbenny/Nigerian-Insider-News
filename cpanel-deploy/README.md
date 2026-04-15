# Nigerian Insider News - cPanel Deployment Guide

## Prerequisites
- Node.js 18+ installed on your cPanel server
- npm or pnpm package manager
- MySQL database access

## Deployment Steps

### 1. Upload Files to cPanel
- Extract this folder to your cPanel public_html or subdomain directory
- Ensure proper file permissions (755 for directories, 644 for files)

### 2. Install Dependencies
```bash
cd /path/to/nigerian-insider-news
npm install
# or
pnpm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/nigerian_insider_news

# Authentication
JWT_SECRET=your-secret-key-here
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# Application
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

# Analytics (Optional)
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

### 4. Set Up Database
```bash
npm run db:push
```

### 5. Start the Application
```bash
npm run start
```

The application will run on `http://localhost:3000`

### 6. Configure Web Server (Nginx/Apache)
Set up a reverse proxy to forward requests to the Node.js application:

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>
```

**Nginx:**
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

### 7. Use Process Manager (Recommended)
Install PM2 for production process management:

```bash
npm install -g pm2
pm2 start index.js --name "nigerian-insider-news"
pm2 save
pm2 startup
```

## Troubleshooting

### Port Already in Use
Change the port in `server/_core/index.ts` or use PM2 with a different port:
```bash
pm2 start index.js --name "nigerian-insider-news" -- --port 3001
```

### Database Connection Issues
- Verify DATABASE_URL is correct
- Ensure MySQL user has proper permissions
- Check firewall settings

### Static Files Not Loading
- Verify public folder permissions
- Check web server configuration
- Ensure VITE_APP_LOGO and image URLs are accessible

## Production Checklist
- [ ] Environment variables configured
- [ ] Database migrated and seeded
- [ ] SSL certificate installed
- [ ] Process manager running
- [ ] Backup strategy in place
- [ ] Monitoring and logging set up
- [ ] CDN configured for static assets (optional)

## Support
For issues or questions, visit: https://instagram.com/osas.codes
