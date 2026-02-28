#!/bin/bash

# Deployment Package Builder for cPanel
# This script creates a deployment-ready package for your Next.js app

echo "🚀 Building deployment package for cPanel..."

# 1. Build the application
if [ ! -d ".next" ]; then
    echo "🔨 Building application..."
    npm run build
fi

# 2. Prepare deployment directory
echo "📦 Creating deployment workspace..."
rm -rf deploy
mkdir -p deploy

# 3. Locate the actual standalone root
# Next.js creates a deep structure like .next/standalone/User/project/...
# We need to find where the 'package.json' is inside standalone
STANDALONE_ROOT=$(find .next/standalone -name "package.json" -not -path ".next/standalone/package.json" | xargs dirname)

if [ -z "$STANDALONE_ROOT" ]; then
    echo "⚠️  Deep standalone root not found, using default..."
    STANDALONE_ROOT=".next/standalone"
fi

echo "📋 Copying standalone files from: $STANDALONE_ROOT"
cp -r $STANDALONE_ROOT/* deploy/

# 4. Copy static assets (CRITICAL for standalone)
echo "🎨 Copying static assets..."
mkdir -p deploy/.next/static
cp -r .next/static/* deploy/.next/static/

# 5. Copy public folder
echo "🖼️  Copying public folder..."
cp -r public deploy/

# 6. Handle server.js
# We should use the GENERATED server.js from standalone, but inject the WASM fix
echo "⚙️  Configuring server..."
if [ -f "deploy/server.js" ]; then
    # Inject WASM disable at the very top of the generated server.js
    echo "Injecting WASM disable into server.js..."
    TEMP_SERVER=$(cat deploy/server.js)
    echo "process.env.UNDICI_NO_WASM = '1';" > deploy/server.js
    echo "process.env.NODE_OPTIONS = '--no-experimental-fetch';" >> deploy/server.js
    echo "$TEMP_SERVER" >> deploy/server.js
else
    # Fallback if no server.js found (unlikely in standalone)
    echo "⚠️  No standalone server.js found, using custom one..."
    cp server.js deploy/
fi

# 7. Copy production dependencies
# We copy the pruned node_modules from standalone build, which is smaller and safer
# If standalone node_modules is missing/empty, we might need to copy root node_modules
if [ ! -d "deploy/node_modules" ] || [ -z "$(ls -A deploy/node_modules)" ]; then
    echo "📚 Copying root node_modules (fallback)..."
    cp -r node_modules deploy/
fi

# 8. Environment setup
if [ -f "production.env" ]; then
    cp production.env deploy/.env.production
    echo "✅ Included .env.production"
elif [ -f "env.production.template" ]; then
    cp env.production.template deploy/
fi

# 9. Create Zip
echo "🗜️  Zipping package..."
cd deploy
zip -r ../landscaper-deploy.zip . > /dev/null
cd ..

SIZE=$(du -h landscaper-deploy.zip | cut -f1)
echo ""
echo "✅ SUCCESS! Package created: landscaper-deploy.zip ($SIZE)"
echo "---------------------------------------------------"
echo "1. Upload landscaper-deploy.zip to cPanel File Manager"
echo "2. Extract it in your app directory"
echo "3. Run: node server.js"
echo "---------------------------------------------------"

echo "✅ Deployment package created successfully!"
echo "📦 File: landscaper-deploy.zip (${SIZE})"
echo ""
echo "Next steps:"
echo "1. Upload landscaper-deploy.zip to your cPanel File Manager"
echo "2. Extract the zip file in your desired directory"
echo "3. Create .env.production with your database credentials"
echo "4. Setup Node.js app in cPanel"
echo "5. Install dependencies: npm install --production"
echo "6. Start your application"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
