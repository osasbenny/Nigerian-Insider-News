# Nigerian Insider News - Netlify Deployment Guide

## Overview
This guide explains how to deploy the Nigerian Insider News website to Netlify with full backend support using Netlify Functions.

## Prerequisites
- Netlify account (free or paid)
- GitHub repository connected to Netlify
- Node.js 18+ locally
- pnpm package manager

## Step 1: Connect GitHub to Netlify

1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Select GitHub and authorize Netlify
4. Choose the `Nigerian-Insider-News` repository
5. Click "Deploy site"

## Step 2: Configure Build Settings

Netlify will automatically detect the `netlify.toml` configuration file. Verify:

- **Build command:** `pnpm build`
- **Publish directory:** `dist/public`
- **Node version:** 22

## Step 3: Set Environment Variables

In Netlify dashboard:

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Add the following environment variables:

```
DATABASE_URL=mysql://user:password@host:3306/database
JWT_SECRET=your-secret-key
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=your-app-id
VITE_APP_TITLE=Nigerian Insider News
VITE_APP_LOGO=https://your-domain.com/logo.png
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id
BUILT_IN_FORGE_API_KEY=your-api-key
BUILT_IN_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

## Step 4: Configure Database Access

For Netlify Functions to access your database:

1. Ensure your database is accessible from the internet
2. Use a connection string with proper credentials
3. Consider using a database proxy service for security

## Step 5: Deploy

### Automatic Deployment
- Push changes to the main branch
- Netlify automatically builds and deploys

### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Step 6: Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Let's Encrypt)

## Deployment Structure

```
dist/
├── public/              # Frontend static files
│   ├── index.html
│   └── assets/
├── index.js            # Backend server (runs as Netlify Function)
└── package.json
```

## API Routes

All API routes are available at:
- `/api/trpc/*` - tRPC endpoints
- `/api/oauth/callback` - OAuth callback

## Monitoring & Logs

1. **Build logs:** Site settings → Deploys
2. **Function logs:** Functions → View logs
3. **Error tracking:** Analytics → Errors

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Verify all environment variables are set
- Ensure Node version is 18+

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check firewall allows Netlify IPs
- Test connection locally first

### Functions Timeout
- Default timeout: 10 seconds (free) / 26 seconds (pro)
- Optimize database queries
- Use caching where possible

### Static Assets Not Loading
- Verify `netlify.toml` publish directory
- Check asset paths in code
- Clear Netlify cache and redeploy

## Performance Tips

1. **Enable Netlify Analytics** for insights
2. **Use Netlify Edge Functions** for faster response times
3. **Configure caching headers** (already in netlify.toml)
4. **Compress images** before uploading
5. **Use CDN** for static assets

## Security Best Practices

1. Never commit `.env` files
2. Use Netlify environment variables for secrets
3. Enable branch protection on main
4. Set up HTTPS (automatic)
5. Configure security headers (already in netlify.toml)

## Rollback

To rollback to a previous deployment:

1. Go to **Deploys**
2. Find the desired deployment
3. Click **Restore** to redeploy

## Support

For Netlify support: https://netlify.com/support
For project issues: https://instagram.com/osas.codes

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Functions Guide](https://docs.netlify.com/functions/overview)
- [Environment Variables](https://docs.netlify.com/configure-builds/environment-variables)
- [Deployment Best Practices](https://docs.netlify.com/site-deploys/overview)
