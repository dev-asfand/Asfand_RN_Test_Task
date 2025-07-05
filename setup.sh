#!/bin/bash

echo "🚀 React Native Location Search App Setup"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (>= 18) first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Install iOS dependencies (if on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Installing iOS dependencies..."
    cd ios && pod install && cd ..
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install iOS dependencies"
        exit 1
    fi
    
    echo "✅ iOS dependencies installed successfully"
else
    echo "ℹ️  Skipping iOS dependencies (not on macOS)"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Get your Google Maps API key from https://console.cloud.google.com/"
echo "2. Update the API key in:"
echo "   - src/config/api.ts"
echo "   - ios/AsfandRNTest/AppDelegate.swift"
echo "   - android/app/src/main/AndroidManifest.xml"
echo "3. Run the app:"
echo "   - iOS: npm run ios"
echo "   - Android: npm run android"
echo ""
echo "📖 For detailed instructions, see README.md" 