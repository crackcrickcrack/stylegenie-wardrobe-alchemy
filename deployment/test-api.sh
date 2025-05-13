#!/bin/bash

API_URL="https://zkbluoyybf.execute-api.us-east-1.amazonaws.com/prod/StyleGenieAI"

echo "=== Testing StyleGenieAI API ==="
echo "API URL: $API_URL"
echo ""

echo "Sending test request for casual outfit with slim body type..."
curl -X POST $API_URL \
  -H 'Content-Type: application/json' \
  -d '{"occasion": "casual", "body_type": "slim"}' | jq '.'

echo ""
echo "Sending test request for formal outfit with athletic body type..."
curl -X POST $API_URL \
  -H 'Content-Type: application/json' \
  -d '{"occasion": "formal", "body_type": "athletic"}' | jq '.'

echo ""
echo "=== API Test Complete ==="
echo ""
echo "If you received proper JSON responses with outfit_description and image_url fields,"
echo "the API is working correctly. Update your website configuration to use this API URL:"
echo "$API_URL" 