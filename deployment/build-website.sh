#!/bin/bash

echo "=== Building StyleGenie Website ==="

# Navigate to project root
cd $(dirname "$0")/..

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build the website
echo "Building website..."
npm run build

echo "=== Website Build Complete ==="
echo ""
echo "The website has been built with the updated API endpoint."
echo "Deploy the contents of the 'dist' directory to your hosting service."
echo ""
echo "To test locally:"
echo "npm run preview" 