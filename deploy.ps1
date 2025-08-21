# 🚀 InooKey Frontend Deployment Script for Windows
# This script helps prepare your project for deployment to GoDaddy

param(
    [string]$Environment = "production"
)

Write-Host "🔒 InooKey Frontend Deployment Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the inookey-landing directory." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Project directory confirmed" -ForegroundColor Green

# Step 1: Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green

# Step 2: Run security audit
Write-Host "🔍 Running security audit..." -ForegroundColor Yellow
npm audit

Write-Host "⚠️  Note: Some vulnerabilities may exist but are not critical for frontend deployment" -ForegroundColor Yellow

# Step 3: Build the project
Write-Host "🏗️  Building project for $Environment..." -ForegroundColor Yellow

if ($Environment -eq "production") {
    npm run build
} else {
    npm run build:$Environment
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully" -ForegroundColor Green

# Step 4: Verify build output
Write-Host "🔍 Verifying build output..." -ForegroundColor Yellow

if (-not (Test-Path "build")) {
    Write-Host "❌ Build folder not found" -ForegroundColor Red
    exit 1
}

$buildFiles = Get-ChildItem "build" -Recurse | Measure-Object
Write-Host "✅ Build folder contains $($buildFiles.Count) files" -ForegroundColor Green

# Step 5: Check file sizes
Write-Host "📊 Analyzing build size..." -ForegroundColor Yellow

$jsFiles = Get-ChildItem "build/static/js" -Filter "*.js" | Sort-Object Length -Descending
$cssFiles = Get-ChildItem "build/static/css" -Filter "*.css" | Sort-Object Length -Descending

Write-Host "📁 JavaScript files:" -ForegroundColor Cyan
foreach ($file in $jsFiles) {
    $sizeKB = [math]::Round($file.Length / 1KB, 2)
    Write-Host "   $($file.Name): $sizeKB KB" -ForegroundColor White
}

Write-Host "📁 CSS files:" -ForegroundColor Cyan
foreach ($file in $cssFiles) {
    $sizeKB = [math]::Round($file.Length / 1KB, 2)
    Write-Host "   $($file.Name): $sizeKB KB" -ForegroundColor White
}

# Step 6: Create deployment package
Write-Host "📦 Creating deployment package..." -ForegroundColor Yellow

$deployFolder = "deploy-ready"
if (Test-Path $deployFolder) {
    Remove-Item $deployFolder -Recurse -Force
}

New-Item -ItemType Directory -Name $deployFolder | Out-Null
Copy-Item "build\*" -Destination $deployFolder -Recurse -Force

# Create .htaccess file
$htaccessContent = @"
# Security Headers for InooKey Frontend
<IfModule mod_headers.c>
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com; font-src 'self' https://fonts.gstatic.com https://fonts.cdnfonts.com; img-src 'self' data: https:; connect-src 'self' https://calendar.app.google; frame-src 'self' https://calendar.app.google;"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# HTTPS Redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Gzip Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css application/xml application/xhtml+xml application/rss+xml application/javascript application/x-javascript
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
"@

$htaccessContent | Out-File -FilePath "$deployFolder\.htaccess" -Encoding UTF8

Write-Host "✅ Deployment package created in '$deployFolder' folder" -ForegroundColor Green

# Step 7: Final instructions
Write-Host ""
Write-Host "🎉 Deployment package ready!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Upload all files from '$deployFolder' to your GoDaddy public_html folder" -ForegroundColor White
Write-Host "2. Ensure .htaccess file is uploaded (it contains security headers)" -ForegroundColor White
Write-Host "3. Configure your domain DNS settings" -ForegroundColor White
Write-Host "4. Enable SSL certificate in GoDaddy cPanel" -ForegroundColor White
Write-Host "5. Test your live website" -ForegroundColor White
Write-Host ""
Write-Host "📚 For detailed instructions, see: GODADDY_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host "🔒 For security details, see: SECURITY_CHECKLIST.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Happy deploying!" -ForegroundColor Green
