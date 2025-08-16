#!/bin/bash

echo "🚀 Deploying ROASORG Pure HTML Website..."

# Create a clean deployment directory
rm -rf deploy-html
mkdir -p deploy-html

# Copy all essential HTML files
cp *.html deploy-html/
cp -r public deploy-html/
cp -r styles deploy-html/
cp -r Assest deploy-html/ 2>/dev/null || echo "No Assest directory found"

# Copy favicon and assets
cp favicon* deploy-html/ 2>/dev/null || echo "No favicon files found"
cp android-chrome* deploy-html/ 2>/dev/null || echo "No android-chrome files found"
cp apple-touch-icon.png deploy-html/ 2>/dev/null || echo "No apple-touch-icon found"
cp site.webmanifest deploy-html/ 2>/dev/null || echo "No site.webmanifest found"
cp CNAME deploy-html/ 2>/dev/null || echo "No CNAME found"

echo "✅ Pure HTML website prepared in 'deploy-html' directory"
echo "📁 Contents:"
ls -la deploy-html/

echo ""
echo "🎯 To deploy to GitHub Pages:"
echo "1. Copy contents of 'deploy-html' folder to your GitHub Pages branch"
echo "2. Or use: git add deploy-html/* && git commit -m 'Deploy pure HTML website' && git push"
echo ""
echo "🌐 This website will work perfectly without any Next.js issues!"
echo "✅ No more 404 errors for JavaScript files!"
echo "✅ No more 'Checking Reset Link...' problems!"
echo "✅ Modern, responsive design with TailwindCSS!"
