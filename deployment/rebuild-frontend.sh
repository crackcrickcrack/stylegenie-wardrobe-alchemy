#!/bin/bash

echo "=== Rebuilding StyleGenie Frontend ==="

# Navigate to project root (assuming we're in deployment directory)
cd $(dirname $0)/..

echo "Working in directory: $(pwd)"

# Install dependencies if needed
echo "Checking for node_modules..."
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
else
  echo "Dependencies already installed."
fi

# Build the project
echo "Building the project..."
npm run build

# Check if build succeeded
if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
  
  # Deploy steps - modify based on your deployment method
  echo "Deploying to production server..."
  
  # This section depends on your hosting setup - adjust as needed
  # Example for copying to a static web server:
  # scp -r dist/* user@server:/var/www/stylegenie
  
  # If using AWS S3:
  # aws s3 sync dist/ s3://your-bucket-name/ --delete
  
  echo "=== Deployment Complete ==="
  echo "The frontend has been rebuilt with the API endpoint fixes."
  echo "Visit http://stylegenie.duckdns.org/ai-style-advisor to test the changes."
else
  echo "❌ Build failed! Check the errors above."
  exit 1
fi 