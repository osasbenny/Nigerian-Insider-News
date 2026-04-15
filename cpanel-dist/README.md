# Nigerian Insider News - cPanel Distribution Build

This is a production-ready distribution package for deploying Nigerian Insider News to cPanel hosting.

## 📦 Package Contents

```
cpanel-dist/
├── index.js                 # Node.js backend server (compiled)
├── package.json            # Project dependencies
├── pnpm-lock.yaml          # Dependency lock file
├── public/                 # Frontend static files
│   ├── index.html          # Main HTML file
│   ├── assets/             # CSS, JavaScript bundles
│   └── __manus__/          # Manus runtime files
├── .htaccess               # Apache reverse proxy configuration
├── SETUP.md                # Detailed setup instructions
├── ENV_TEMPLATE.txt        # Environment variables template
├── ecosystem.config.js     # PM2 process manager config
└── README.md               # This file
```

## ⚡ Quick Start (5 Minutes)

### 1. Extract Files
```bash
# Using tar
tar -xzf nigerian-insider-news-cpanel.tar.gz -C ~/public_html

# Or using zip
unzip nigerian-insider-news-cpanel.zip -d ~/public_html
```

### 2. Install Dependencies
```bash
cd ~/public_html/cpanel-dist
npm install
```

### 3. Configure Environment
```bash
cp ENV_TEMPLATE.txt .env
nano .env  # Edit with your database credentials and API keys
```

### 4. Setup Database
```bash
npm run db:push
```

### 5. Start Application
```bash
npm start
```

Visit `http://localhost:3000` to verify it's running.

## 🚀 Deployment Methods

### Method 1: Using PM2 (Recommended)
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Method 2: Using nohup
```bash
nohup npm start > app.log 2>&1 &
```

### Method 3: Using cPanel AutoStart
1. Go to cPanel → **Application Manager**
2. Create new Node.js application
3. Point to your app directory
4. Set startup file to `index.js`

## 🔧 Configuration

### Environment Variables (.env)
Required variables:
- `DATABASE_URL` - MySQL connection string
- `JWT_SECRET` - Random secret for authentication
- `VITE_APP_ID` - Your Manus app ID
- `OAUTH_SERVER_URL` - OAuth provider URL

See `ENV_TEMPLATE.txt` for complete list.

### Apache Configuration (.htaccess)
The `.htaccess` file includes:
- Reverse proxy to Node.js application
- Gzip compression
- Browser caching headers
- Security headers
- HTTPS redirect

## 📊 File Sizes
- Total package: ~1.6 MB (uncompressed)
- Compressed (tar.gz): ~427 KB
- Compressed (zip): ~430 KB

## 🔐 Security

Before deploying:
- [ ] Generate strong JWT_SECRET
- [ ] Set secure database password
- [ ] Enable HTTPS/SSL certificate
- [ ] Set proper file permissions (755 dirs, 644 files)
- [ ] Keep dependencies updated
- [ ] Regular backups configured

## 📝 Database Setup

### Create Database in cPanel
1. Go to **MySQL Databases**
2. Create database: `nigerian_insider_news`
3. Create user with strong password
4. Grant all privileges

### Connection String
```
mysql://username:password@localhost:3306/nigerian_insider_news
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
lsof -i :3000
kill -9 <PID>
```

### Database Connection Failed
- Verify DATABASE_URL format
- Check MySQL is running
- Confirm user permissions

### npm install Fails
```bash
npm cache clean --force
npm install
```

### Static Files Not Loading
- Check `public` folder permissions
- Verify `.htaccess` is in place
- Check web server error logs

## 📚 Additional Resources

- **Full Setup Guide:** See `SETUP.md`
- **GitHub Repository:** https://github.com/osasbenny/Nigerian-Insider-News
- **Designer:** https://instagram.com/osas.codes

## 🆘 Support

For issues:
1. Check `SETUP.md` troubleshooting section
2. Review cPanel error logs
3. Check application logs: `pm2 logs nigerian-insider-news`
4. Contact support via GitHub issues

## 📋 Deployment Checklist

- [ ] Files extracted to public_html
- [ ] Dependencies installed
- [ ] .env file created with credentials
- [ ] Database created and migrated
- [ ] Application started successfully
- [ ] Accessible via domain/subdomain
- [ ] SSL certificate installed
- [ ] Backups configured

## 🎯 Next Steps

1. **Configure Custom Domain** - Point domain to your cPanel account
2. **Enable SSL** - Use AutoSSL or install certificate
3. **Setup Monitoring** - Configure error alerts
4. **Schedule Backups** - Daily database and code backups
5. **Monitor Performance** - Check resource usage in cPanel

---

**Version:** 1.0.0
**Last Updated:** April 15, 2026
**Built with:** React 19, Express 4, Node.js 22
