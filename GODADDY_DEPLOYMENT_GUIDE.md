# 🚀 GoDaddy Deployment Guide for InooKey Frontend

## 📋 Prerequisites
- ✅ GoDaddy domain purchased and active
- ✅ GoDaddy hosting plan (Shared, VPS, or Dedicated)
- ✅ Access to GoDaddy control panel
- ✅ Production build ready (`npm run build` completed)

## 🔧 Step-by-Step Deployment

### **Step 1: Prepare Your Build Files**
```bash
# Ensure you're in the project directory
cd inookey-landing

# Create production build
npm run build

# Verify build folder exists
ls build/
```

**Expected output:** `build/` folder with `index.html`, `static/`, and other assets

### **Step 2: Access GoDaddy Control Panel**
1. **Login to GoDaddy** at [godaddy.com](https://godaddy.com)
2. **Go to My Products** → **Web Hosting**
3. **Click "Manage"** on your hosting plan
4. **Access cPanel** or **File Manager**

### **Step 3: Upload Files to GoDaddy**

#### **Option A: Using cPanel File Manager (Recommended)**
1. **Open File Manager** in cPanel
2. **Navigate to** `public_html/` folder
3. **Delete existing files** (if any)
4. **Upload all files** from your `build/` folder:
   - Select all files in `build/`
   - Drag and drop to `public_html/`
   - Ensure `index.html` is in the root

#### **Option B: Using FTP/SFTP**
1. **Get FTP credentials** from GoDaddy hosting details
2. **Use FileZilla** or similar FTP client
3. **Connect to your server**
4. **Upload all files** from `build/` to `public_html/`

### **Step 4: Configure Domain Settings**

#### **Domain Pointing**
1. **Go to Domains** in GoDaddy control panel
2. **Select your domain** → **Manage DNS**
3. **Update A Record**:
   - **Type:** A
   - **Name:** @ (or leave blank)
   - **Value:** Your hosting server IP
   - **TTL:** 600 (or default)

#### **Subdomain Setup (Optional)**
1. **Add CNAME Record**:
   - **Type:** CNAME
   - **Name:** www
   - **Value:** @ (or your domain)
   - **TTL:** 600

### **Step 5: Enable SSL Certificate**

#### **Free SSL (Let's Encrypt)**
1. **In cPanel**, find **SSL/TLS Status**
2. **Click "Install SSL Certificate"**
3. **Choose "Let's Encrypt"** (free)
4. **Select your domain** and install

#### **Paid SSL (Recommended for Business)**
1. **Purchase SSL certificate** from GoDaddy
2. **Follow installation wizard**
3. **Verify installation** with SSL checker

### **Step 6: Configure Security Headers**

#### **Create .htaccess File**
Create a `.htaccess` file in `public_html/` with:

```apache
# Security Headers
<IfModule mod_headers.c>
    # Content Security Policy
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com; font-src 'self' https://fonts.gstatic.com https://fonts.cdnfonts.com; img-src 'self' data: https:; connect-src 'self' https://calendar.app.google; frame-src 'self' https://calendar.app.google;"
    
    # HTTPS Redirect
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    
    # XSS Protection
    Header always set X-XSS-Protection "1; mode=block"
    
    # Frame Options
    Header always set X-Frame-Options "SAMEORIGIN"
    
    # Content Type Options
    Header always set X-Content-Type-Options "nosniff"
    
    # Referrer Policy
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# HTTPS Redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Gzip Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### **Step 7: Test Your Deployment**

#### **Basic Functionality Test**
1. **Visit your domain** in browser
2. **Check all pages** load correctly
3. **Verify images** display properly
4. **Test responsive design** on mobile
5. **Check Google Meet** button functionality

#### **Security Test**
1. **Visit** [securityheaders.com](https://securityheaders.com)
2. **Enter your domain** and check score
3. **Verify SSL** at [ssllabs.com](https://ssllabs.com)
4. **Check mobile performance** at [pagespeed.web.dev](https://pagespeed.web.dev)

### **Step 8: Performance Optimization**

#### **CDN Setup (Optional but Recommended)**
1. **Sign up for Cloudflare** (free tier available)
2. **Add your domain** to Cloudflare
3. **Update nameservers** to Cloudflare
4. **Enable caching** and optimization features

#### **Image Optimization**
1. **Compress images** using tools like TinyPNG
2. **Use WebP format** where possible
3. **Implement lazy loading** (already in your React app)

## 🔍 Troubleshooting

### **Common Issues & Solutions**

#### **Files Not Loading**
- **Check file permissions** (644 for files, 755 for folders)
- **Verify file paths** are correct
- **Clear browser cache** and try again

#### **SSL Not Working**
- **Wait 24-48 hours** for SSL propagation
- **Check SSL status** in cPanel
- **Verify domain pointing** to correct server

#### **Performance Issues**
- **Enable Gzip compression** in .htaccess
- **Optimize images** before upload
- **Use CDN** for better global performance

## 📊 Post-Deployment Checklist

- [ ] **Website loads** without errors
- [ ] **All pages accessible** and functional
- [ ] **Images display** correctly
- [ ] **SSL certificate** working (https://)
- [ ] **Security headers** implemented
- [ ] **Mobile responsive** design working
- [ ] **Google Meet integration** functional
- [ ] **Performance score** acceptable (>80)
- [ ] **SEO meta tags** properly set
- [ ] **Analytics** configured (if needed)

## 🎯 Next Steps

1. **Monitor performance** using Google PageSpeed Insights
2. **Set up monitoring** for uptime and performance
3. **Regular security updates** for dependencies
4. **Backup strategy** for your website files
5. **Consider CDN** for global performance improvement

---

**Need Help?** Contact GoDaddy support or refer to their hosting documentation.

**Deployment Status:** 🟢 **READY TO DEPLOY**
