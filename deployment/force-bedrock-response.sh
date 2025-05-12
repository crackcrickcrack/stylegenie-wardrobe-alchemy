#!/bin/bash

echo "=== Modifying StyleGenieAI to Force Bedrock Responses ==="

# Create a temporary directory
TMP_DIR=$(mktemp -d)
cd $TMP_DIR

echo "Working in directory: $TMP_DIR"

# Create the Lambda function file without any hardcoded responses
echo "Creating Lambda function that only uses Bedrock..."
cat << 'EOL' > lambda_function.py
import json
import boto3
import os
import traceback
import random
import time
from datetime import datetime

# Initialize Bedrock client
try:
    bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')
    print("Successfully initialized Bedrock client")
except Exception as e:
    print(f"Error initializing Bedrock client: {str(e)}")
    print(traceback.format_exc())

# Set the model ID to use an available model - with fallbacks
PRIMARY_MODEL_ID = "anthropic.claude-3-sonnet-20240229-v1:0"
FALLBACK_MODEL_IDS = [
    "anthropic.claude-3-haiku-20240307-v1:0",
    "anthropic.claude-instant-v1"
]

def format_response(status_code, body):
    """Format the API Gateway response with CORS headers"""
    print(f"Returning response with status {status_code}")
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True,
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
        },
        "body": json.dumps(body)
    }

def generate_placeholder_images(occasion, body_type, item_type, index):
    """Generate placeholder image URLs that will actually render"""
    # Generate a random ID to avoid caching issues
    random_id = random.randint(1000, 9999)
    
    # Create image URL with specific text
    if item_type == "outfit":
        return f"https://placehold.co/600x800/EEE/31343C?text=Bedrock+Generated+Outfit+{index}+{random_id}"
    else:  # historical
        return f"https://placehold.co/600x800/EEE/31343C?text=Historical+Fashion+{index}+{random_id}"

def invoke_bedrock_with_retries(prompt, max_retries=3):
    """Invoke Bedrock with retries and model fallbacks"""
    
    models_to_try = [PRIMARY_MODEL_ID] + FALLBACK_MODEL_IDS
    
    for retry in range(max_retries + 1):
        for model_id in models_to_try:
            try:
                print(f"Trying to invoke Bedrock with model: {model_id} (Attempt {retry+1}/{max_retries+1})")
                
                # Test if bedrock is available
                if bedrock is None:
                    print("Bedrock client not available, retrying initialization")
                    bedrock_test = boto3.client('bedrock-runtime', region_name='us-east-1')
                    print("Successfully re-initialized Bedrock client")
                
                # Actual model invocation
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
                ai_response = response_body['content'][0]['text']
                print(f"Successfully received response from Bedrock with model {model_id}")
                print(f"Response length: {len(ai_response)}")
                print(f"First 100 chars: {ai_response[:100]}")
                
                return ai_response
            
            except Exception as e:
                print(f"Error invoking Bedrock with model {model_id}: {str(e)}")
                print(traceback.format_exc())
                time.sleep(1)
    
    # If we get here, all attempts failed
    print("All Bedrock invocation attempts failed")
    return None

def lambda_handler(event, context):
    print(f"Received event: {json.dumps(event)}")
    
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
                print(f"Raw body: {event['body']}")
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
      "description": "Complete description of the outfit"
    }},
    ...
  ],
  "historical_fashion": [
    {{ 
      "year": "1950s"
    }},
    ...
  ]
}}

Do not include image_url fields in your response. The system will generate those separately.
This is a TEST to verify Bedrock integration - please be creative with your response and avoid standard suggestions."""

        # Invoke Bedrock - no fallback to hardcoded responses
        ai_response = invoke_bedrock_with_retries(prompt)
        
        if ai_response:
            try:
                # Try to extract JSON from the response
                json_str = ai_response
                if "```json" in ai_response:
                    json_str = ai_response.split("```json")[1].split("```")[0].strip()
                elif "```" in ai_response:
                    json_str = ai_response.split("```")[1].strip()
                
                result = json.loads(json_str)
                print("Successfully parsed JSON from response")
                
                # Check if the response has the expected structure
                if 'outfit_suggestions' not in result or 'historical_fashion' not in result:
                    print("Response missing required fields")
                    # Return error message showing the raw response
                    return format_response(500, {
                        "error": "Bedrock response missing required fields",
                        "raw_response": ai_response[:500] + "..." if len(ai_response) > 500 else ai_response
                    })
                
                # Add image_url to each outfit suggestion
                for i, outfit in enumerate(result['outfit_suggestions']):
                    outfit['image_url'] = generate_placeholder_images(occasion, body_type, "outfit", i+1)
                
                # Add image_url to each historical fashion item
                for i, hist_item in enumerate(result['historical_fashion']):
                    hist_item['image_url'] = generate_placeholder_images(occasion, body_type, "historical", i)
                
                # Add a flag to indicate this is from Bedrock
                result['source'] = "bedrock"
                
                return format_response(200, result)
            except Exception as e:
                print(f"Error parsing AI response as JSON: {str(e)}")
                print(f"Raw AI response: {ai_response}")
                # Return error with the raw response for debugging
                return format_response(500, {
                    "error": "Failed to parse Bedrock response as JSON",
                    "raw_response": ai_response[:500] + "..." if len(ai_response) > 500 else ai_response
                })
        else:
            # Return clear error indicating Bedrock failed
            return format_response(500, {
                "error": "Failed to get response from Bedrock",
                "message": "This is a test deployment that only uses Bedrock responses with no fallbacks.",
                "debug_info": "Check CloudWatch logs for detailed error information."
            })
    
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

echo "=== Lambda function updated to only use Bedrock responses ==="
echo "The Lambda function has been modified to:"
echo "- Only return responses from Bedrock (no hardcoded fallbacks)"
echo "- Return detailed error information if Bedrock fails"
echo "- Add a 'source' field to the response to confirm it's from Bedrock"
echo ""
echo "Next steps:"
echo "1. Try the AI Style Advisor page again"
echo "2. If you see an error response, check the CloudWatch logs"
echo "3. After testing, run ./fix-bedrock-integration.sh to restore fallback behavior"

# Clean up
cd ..
rm -rf $TMP_DIR 