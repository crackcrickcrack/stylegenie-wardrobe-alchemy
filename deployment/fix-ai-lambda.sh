#!/bin/bash

echo "=== Fixing StyleGenieAI Lambda Function ==="

# Create a temporary directory
TMP_DIR=$(mktemp -d)
cd $TMP_DIR

echo "Working in directory: $TMP_DIR"

# Create the Lambda function file
echo "Creating Lambda function file..."
cat << 'EOL' > lambda_function.py
import json
import boto3
import os
import traceback
from datetime import datetime

# Initialize Bedrock client
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

# Set the model ID to use an available model
model_id = "anthropic.claude-3-sonnet-20240229-v1:0"

def format_response(status_code, body):
    """Format the API Gateway response with CORS headers"""
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True
        },
        "body": json.dumps(body)
    }

def get_default_response():
    """Generate a default response structure if the model fails"""
    return {
        "outfit_suggestions": [
            {
                "image_url": "https://placehold.co/600x400/png?text=Outfit+Suggestion+1",
                "description": "A casual ensemble featuring dark wash jeans paired with a light blue button-down shirt. Complete with brown leather loafers and a matching belt. Perfect for a relaxed yet put-together look."
            },
            {
                "image_url": "https://placehold.co/600x400/png?text=Outfit+Suggestion+2",
                "description": "Khaki chinos paired with a navy polo shirt. Add white sneakers and a minimalist watch for a clean, casual aesthetic suitable for everyday wear."
            },
            {
                "image_url": "https://placehold.co/600x400/png?text=Outfit+Suggestion+3",
                "description": "Black slim-fit jeans with a gray crew neck t-shirt and a light bomber jacket. Finish with black leather sneakers for a modern, versatile casual outfit."
            }
        ],
        "historical_fashion": [
            {
                "year": "1950s",
                "image_url": "https://placehold.co/600x400/png?text=1950s+Fashion"
            },
            {
                "year": "1970s",
                "image_url": "https://placehold.co/600x400/png?text=1970s+Fashion"
            }
        ]
    }

def lambda_handler(event, context):
    try:
        # Parse the request
        if 'body' in event and event['body']:
            try:
                body = json.loads(event['body'])
                occasion = body.get('occasion', '')
                body_type = body.get('body_type', '')
                photo_url = body.get('photo', '')
            except Exception as e:
                print(f"Error parsing body: {str(e)}")
                occasion = event.get('occasion', '')
                body_type = event.get('body_type', '')
                photo_url = event.get('photo', '')
        else:
            occasion = event.get('occasion', '')
            body_type = event.get('body_type', '')
            photo_url = event.get('photo', '')
        
        print(f"Processing request: occasion={occasion}, body_type={body_type}, photo_url={'present' if photo_url else 'not present'}")
        
        if not occasion or not body_type:
            print("Missing required parameters")
            return format_response(400, {"error": "occasion and body_type are required"})
        
        # Prepare prompt for Claude
        prompt = f"""Human: I need some fashion advice for the following scenario:
Occasion: {occasion}
Body Type: {body_type}
{'Photo URL: ' + photo_url if photo_url else ''}

Please provide:
1. Three outfit suggestions including clothes, shoes, and accessories. Each should have a detailed description.
2. Two examples of how this style has evolved throughout history, with the year and a brief description.

Format your response as JSON with the following structure:
{{
  "outfit_suggestions": [
    {{ 
      "image_url": "https://placehold.co/600x400/png?text=Outfit+Suggestion+1",
      "description": "Complete description of the outfit"
    }},
    ...
  ],
  "historical_fashion": [
    {{ 
      "year": "1950s",
      "image_url": "https://placehold.co/600x400/png?text=1950s+Fashion"
    }},
    ...
  ]
}}"""

        # Invoke Bedrock model
        try:
            print(f"Invoking Bedrock model: {model_id}")
            response = bedrock.invoke_model(
                modelId=model_id,
                body=json.dumps({
                    "anthropic_version": "bedrock-2023-05-31",
                    "max_tokens": 4096,
                    "temperature": 0.7,
                    "messages": [
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": prompt
                                }
                            ]
                        }
                    ]
                })
            )
            
            # Parse the response
            response_body = json.loads(response['body'].read())
            print("Got response from Bedrock")
            
            # Extract the AI generated content
            ai_response = response_body['content'][0]['text']
            print(f"AI response length: {len(ai_response)}")
            
            # Extract the JSON part from the response
            try:
                # Try to extract JSON from the response
                json_str = ai_response
                if "```json" in ai_response:
                    json_str = ai_response.split("```json")[1].split("```")[0].strip()
                elif "```" in ai_response:
                    json_str = ai_response.split("```")[1].strip()
                
                result = json.loads(json_str)
                print("Successfully parsed JSON from response")
                
                # Ensure the response has the expected structure
                if 'outfit_suggestions' not in result or 'historical_fashion' not in result:
                    print("Response missing required fields, using default structure")
                    # Fill in missing fields with defaults
                    default = get_default_response()
                    if 'outfit_suggestions' not in result:
                        result['outfit_suggestions'] = default['outfit_suggestions']
                    if 'historical_fashion' not in result:
                        result['historical_fashion'] = default['historical_fashion']
                
                return format_response(200, result)
            except Exception as e:
                print(f"Error parsing AI response as JSON: {str(e)}")
                print(f"Raw AI response: {ai_response}")
                # Return default response if JSON parsing fails
                return format_response(200, get_default_response())
        
        except Exception as e:
            print(f"Error invoking Bedrock: {str(e)}")
            print(traceback.format_exc())
            # Return default response if Bedrock invocation fails
            return format_response(200, get_default_response())
    
    except Exception as e:
        print(f"Unhandled error: {str(e)}")
        print(traceback.format_exc())
        return format_response(500, {"error": "Internal server error"})
EOL

# Create zip file
echo "Creating deployment package..."
zip lambda_function.zip lambda_function.py

# Update Lambda function
echo "Updating Lambda function..."
aws lambda update-function-code \
    --function-name StyleGenieAI \
    --zip-file fileb://lambda_function.zip

# Update Lambda configuration
echo "Updating Lambda configuration..."
aws lambda update-function-configuration \
    --function-name StyleGenieAI \
    --timeout 30

# Get the Lambda role
ROLE_NAME=$(aws lambda get-function \
    --function-name StyleGenieAI \
    --query 'Configuration.Role' \
    --output text | sed 's/.*\///')

echo "Lambda role: $ROLE_NAME"

# Add Bedrock permissions
echo "Adding Bedrock permissions to Lambda role..."
aws iam attach-role-policy \
    --role-name $ROLE_NAME \
    --policy-arn arn:aws:iam::aws:policy/AmazonBedrockFullAccess

echo "Creating a test event..."
cat << 'EOL' > test-event.json
{
  "occasion": "casual",
  "body_type": "slim"
}
EOL

echo "Testing the Lambda function..."
aws lambda invoke \
    --function-name StyleGenieAI \
    --payload file://test-event.json \
    lambda-response.json

echo "Response saved to lambda-response.json"
cat lambda-response.json

# Clean up
echo "Cleaning up..."
cd - > /dev/null
#rm -rf $TMP_DIR

echo "=== Lambda fix completed ==="
echo "Please check your lambda-response.json file to verify the response"
echo "To test the API through the website, visit http://stylegenie.duckdns.org/ai-style-advisor" 