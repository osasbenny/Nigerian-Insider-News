# Nigerian Insider News - Complete Deployment Guide

## Overview

The Nigerian Insider News website is a full-stack application built with React, Express, and Node.js. It can be deployed to multiple platforms including cPanel, Netlify, and other Node.js hosting providers.

## Project Structure

```
nigerian-insider-news/
├── client/                 # React frontend
├── server/                 # Express backend
├── drizzle/               # Database migrations
├── dist/                  # Production build output
├── cpanel-deploy/         # cPanel deployment package
├── deployment-packages/   # Ready-to-deploy archives
├── netlify.toml          # Netlify configuration
└── package.json          # Project dependencies
```

## Deployment Options

### Option 1: cPanel Deployment (Traditional Hosting)

**Best for:** Shared hosting, dedicated servers, VPS

#### Quick Start
```bash
# 1. Extract cpanel-deploy.tar.gz to your public_html
tar -xzf cpanel-deploy.tar.gz -C ~/public_html

# 2. Install dependencies
cd ~/public_html/cpanel-deploy
npm install

# 3. Configure environment variables
nano .env

# 4. Set up database
npm run db:push

# 5. Start with PM2
npm install -g pm2
pm2 start index.js --name "nigerian-insider-news"
pm2 save
pm2 startup
```

#### Requirements
- Node.js 18+
- MySQL/MariaDB
- SSH access
- Port forwarding (3000 or custom)

#### Configuration
See `cpanel-deploy/README.md` for detailed setup instructions.

---

### Option 2: Netlify Deployment (Serverless)

**Best for:** Scalability, automatic deployments, free tier available

#### Quick Start
```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login to Netlify
netlify login

# 3. Deploy
netlify deploy --prod
```

#### GitHub Integration (Recommended)
1. Push to GitHub
2. Connect repository to Netlify
3. Netlify automatically builds and deploys on every push
4. Set environment variables in Netlify dashboard

#### Requirements
- Netlify account (free or paid)
- GitHub repository
- Environment variables configured

#### Configuration
See `NETLIFY_DEPLOYMENT.md` for detailed setup instructions.

---

### Option 3: Other Node.js Platforms

The application can also be deployed to:
- **Heroku** - `npm start`
- **Railway** - `npm start`
- **Render** - `npm start`
- **AWS EC2** - `npm start` with PM2
- **DigitalOcean** - `npm start` with PM2
- **Vercel** - Limited support (API routes only)

---

## Mobile Responsiveness

The Nigerian Insider News website is **fully mobile responsive** with:

- ✅ Responsive navigation with mobile menu toggle
- ✅ Mobile-optimized breaking news ticker
- ✅ Flexible grid layouts (1 column on mobile, 2-3 on desktop)
- ✅ Touch-friendly buttons and interactive elements
- ✅ Optimized images with lazy loading
- ✅ Readable typography on all screen sizes
- ✅ Tested on iOS, Android, and various screen sizes

### Mobile Features
- Hamburger menu for navigation
- Collapsible category menu
- Mobile-first design approach
- Optimized form inputs
- Accessible touch targets (44px minimum)

---

## Build Artifacts

### Production Build
```bash
pnpm build
```

Output:
- `dist/public/` - Frontend static files (HTML, CSS, JS)
- `dist/index.js` - Backend server (31KB)
- Total size: ~1.3MB

### Build Optimization
- Minified CSS and JavaScript
- Gzip compression ready
- Tree-shaking for unused code
- Image optimization support

---

## Environment Variables

### Required Variables
```env
# Database
DATABASE_URL=mysql://user:password@host:3306/database

# Authentication
JWT_SECRET=your-secret-key-here
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# Application
VITE_APP_ID=your-app-id
VITE_APP_TITLE=Nigerian Insider News
VITE_APP_LOGO=https://your-domain.com/logo.png

# Owner
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id

# API Keys
BUILT_IN_FORGE_API_KEY=your-api-key
BUILT_IN_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
```

### Optional Variables
```env
# Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

---

## Database Setup

### Create Database
```sql
CREATE DATABASE nigerian_insider_news CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'nin_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON nigerian_insider_news.* TO 'nin_user'@'localhost';
FLUSH PRIVILEGES;
```

### Run Migrations
```bash
npm run db:push
```

### Seed Data
Database is pre-seeded with 10 Nigerian news articles.

---

## Performance Optimization

### Frontend
- Lazy loading for images
- Code splitting for routes
- Minified assets
- Gzip compression
- Browser caching headers

### Backend
- Connection pooling
- Query optimization
- Response caching
- Error handling

### Deployment
- Use CDN for static assets
- Enable compression on web server
- Configure caching headers
- Monitor performance metrics

---

## Security Checklist

- [ ] SSL/HTTPS enabled
- [ ] Environment variables configured
- [ ] Database user with limited permissions
- [ ] Firewall configured
- [ ] Regular backups scheduled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] SQL injection prevention (using ORM)
- [ ] XSS protection enabled

---

## Monitoring & Maintenance

### Logs
- Application logs: Check PM2 logs or Netlify logs
- Database logs: MySQL error log
- Web server logs: Apache/Nginx access/error logs

### Backups
- Database: Daily automated backups
- Code: GitHub repository
- Static files: CDN or backup storage

### Updates
- Node.js: Keep updated to latest LTS
- Dependencies: Regular security updates
- Database: Monitor and optimize queries

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Failed
```bash
# Test connection
mysql -h host -u user -p database

# Check DATABASE_URL format
# mysql://user:password@host:3306/database
```

### Static Files Not Loading
- Verify public folder exists
- Check web server configuration
- Ensure correct file permissions (644 for files, 755 for directories)
- Verify asset paths in code

### High Memory Usage
- Check for memory leaks
- Optimize database queries
- Implement caching
- Use clustering for multiple cores

---

## Support & Resources

- **GitHub:** https://github.com/osasbenny/Nigerian-Insider-News
- **Designer:** https://instagram.com/osas.codes
- **Netlify Docs:** https://docs.netlify.com
- **Node.js Docs:** https://nodejs.org/docs
- **Express Docs:** https://expressjs.com

---

## Deployment Checklist

### Pre-Deployment
- [ ] All code committed to GitHub
- [ ] Environment variables configured
- [ ] Database migrations tested locally
- [ ] Build successful (`pnpm build`)
- [ ] Tests passing (`pnpm test`)

### Deployment
- [ ] Choose hosting platform
- [ ] Configure environment variables
- [ ] Set up database
- [ ] Deploy application
- [ ] Verify deployment

### Post-Deployment
- [ ] Test all features
- [ ] Verify mobile responsiveness
- [ ] Check error logs
- [ ] Monitor performance
- [ ] Set up monitoring/alerts

---

## License

This project is created for Nigerian Insider News. All rights reserved.

---

**Last Updated:** April 15, 2026
**Version:** 1.0.0
