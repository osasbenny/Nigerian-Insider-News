# Nigerian Insider News - Static cPanel Deployment

This is a **static HTML/CSS/JavaScript** version of Nigerian Insider News optimized for cPanel hosting without Node.js requirements.

## Features

✅ **Fully Static** - No backend server required  
✅ **Mobile Responsive** - Works on all devices  
✅ **SPA Routing** - All links work without 404 errors  
✅ **Fast Loading** - Gzip compression and caching enabled  
✅ **SEO Optimized** - Proper meta tags and structure  
✅ **Security Headers** - Built-in security configuration  

## Quick Start (5 Minutes)

### Step 1: Upload Files
1. Extract the `cpanel-dist` folder contents
2. Upload all files to your cPanel `public_html` folder via FTP/SFTP or File Manager
3. Make sure `.htaccess` is uploaded (hidden file - enable "Show Hidden Files" in cPanel)

### Step 2: Verify Installation
1. Visit your domain: `https://yourdomain.com`
2. You should see the Nigerian Insider News homepage
3. Click on any link - all navigation works without errors

### Step 3: Customize (Optional)
- Edit `index.html` to change site title, meta tags, or content
- Modify `assets/` folder for custom styling
- Add your own images/media to the `assets/` folder

## File Structure

```
cpanel-dist/
├── index.html              # Main page (all routes served here)
├── .htaccess              # Apache configuration (SPA routing)
├── assets/
│   ├── index-*.css        # Compiled CSS
│   ├── index-*.js         # Compiled JavaScript
│   └── images/            # Images and media
└── __manus__/             # Manus configuration
```

## How It Works

- **SPA Routing**: The `.htaccess` file redirects all non-file requests to `index.html`
- **Client-Side Navigation**: React handles all page routing in the browser
- **No Backend**: Everything runs on the frontend - no database or server needed
- **Caching**: Static assets are cached by browsers for faster loading

## Troubleshooting

### "404 Not Found" Error
- **Solution**: Ensure `.htaccess` is uploaded and `mod_rewrite` is enabled in cPanel
- Check: cPanel → Apache Modules → Ensure `mod_rewrite` is enabled

### Styles not loading
- **Solution**: Clear browser cache (Ctrl+Shift+Delete)
- Check file permissions: All files should be readable (644 for files, 755 for directories)

### Links not working
- **Solution**: Verify `.htaccess` is in the root folder
- Check: The file should be named exactly `.htaccess` (with the dot)

### Blank page
- **Solution**: Check browser console for errors (F12 → Console)
- Verify `index.html` and `assets/` folder are uploaded

## Performance Tips

1. **Enable Gzip**: Already configured in `.htaccess`
2. **Browser Caching**: Already configured in `.htaccess`
3. **CDN**: Consider using Cloudflare for additional caching
4. **Minification**: Assets are already minified

## Security

- ✅ HTTPS redirect configured
- ✅ Security headers set
- ✅ XSS protection enabled
- ✅ Clickjacking protection enabled

## Support

For issues or questions:
- Check the troubleshooting section above
- Review `.htaccess` configuration
- Verify file permissions
- Check cPanel error logs

## Version

Nigerian Insider News v1.0.0 - Static Edition
Built with React, TypeScript, and Tailwind CSS
