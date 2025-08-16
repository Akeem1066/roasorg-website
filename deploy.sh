#!/bin/bash

echo "🚀 Deploying ROASORG Website to GitHub Pages..."

# Create deployment directory
mkdir -p deploy

# Copy all HTML files and assets
cp *.html deploy/
cp -r Assest deploy/ 2>/dev/null || echo "No Assest directory found"
cp -r public deploy/ 2>/dev/null || echo "No public directory found"
cp favicon* deploy/ 2>/dev/null || echo "No favicon files found"
cp android-chrome* deploy/ 2>/dev/null || echo "No android-chrome files found"
cp apple-touch-icon.png deploy/ 2>/dev/null || echo "No apple-touch-icon found"
cp site.webmanifest deploy/ 2>/dev/null || echo "No site.webmanifest found"
cp CNAME deploy/ 2>/dev/null || echo "No CNAME found"

# Copy styles if they exist
cp -r styles deploy/ 2>/dev/null || echo "No styles directory found"

echo "✅ Files copied to deploy directory"
echo "📁 Contents of deploy directory:"
ls -la deploy/

echo ""
echo "🎯 Next steps:"
echo "1. Copy contents of 'deploy' folder to your GitHub Pages branch"
echo "2. Or use: git add deploy/* && git commit -m 'Deploy pure HTML website' && git push"
echo ""
echo "🌐 Your website will work perfectly without Next.js!"
