#!/bin/bash

echo "=== Fixing StyleGenieAI Lambda Permissions ==="

# Create a temporary directory for the IAM policy
TMP_DIR=$(mktemp -d)
cd $TMP_DIR

# First, get the Lambda's execution role
echo "Getting Lambda execution role..."
LAMBDA_ROLE=$(aws lambda get-function --function-name StyleGenieAI --query 'Configuration.Role' --output text)
ROLE_NAME=$(echo $LAMBDA_ROLE | cut -d'/' -f2)

echo "Lambda execution role: $ROLE_NAME"

# Create policy document for bedrock:InvokeModel
echo "Creating Bedrock policy document..."
cat << 'EOL' > bedrock-policy.json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "bedrock:InvokeModel",
                "bedrock:InvokeModelWithResponseStream"
            ],
            "Resource": "*"
        }
    ]
}
EOL

# Attach the policy to the role
echo "Attaching Bedrock policy to role..."
aws iam put-role-policy --role-name $ROLE_NAME --policy-name BedrockAccess --policy-document file://bedrock-policy.json

echo "Updating Lambda function configuration..."

# Update Lambda timeout and memory
aws lambda update-function-configuration \
    --function-name StyleGenieAI \
    --timeout 30 \
    --memory-size 1024

# Create the Lambda function file with improved error handling
echo "Creating updated Lambda function file with improved logging..."
cat << 'EOL' > lambda_function.py
import json
import boto3
import os
import traceback
import random
from datetime import datetime

# Initialize Bedrock client
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

# Set the model ID to use an available model
model_id = "anthropic.claude-3-sonnet-20240229-v1:0"

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

def generate_better_placeholder_images(occasion, body_type, item_type, index):
    """Generate better placeholder image URLs that will actually render"""
    
    # Create more specific image text based on the occasion and body type
    categories = {
        "casual": ["casual", "relaxed", "everyday", "weekend"],
        "formal": ["elegant", "sophisticated", "dressy", "formal"],
        "business": ["business", "professional", "office", "work"],
        "party": ["party", "celebration", "festive", "night-out"],
        "wedding": ["wedding", "ceremony", "formal-event", "celebration"]
    }
    
    body_types = {
        "slim": ["slim", "lean", "slender"],
        "athletic": ["athletic", "fit", "toned"],
        "curvy": ["curvy", "hourglass", "shapely"],
        "petite": ["petite", "small", "compact"],
        "plus-size": ["plus-size", "full-figured", "curvy"]
    }
    
    # Get random descriptors
    occasion_term = random.choice(categories.get(occasion.lower(), ["stylish"]))
    body_term = random.choice(body_types.get(body_type.lower(), ["stylish"]))
    
    # Create image URL with specific text
    if item_type == "outfit":
        return f"https://placehold.co/600x800/EEE/31343C?text={occasion_term}+{body_term}+outfit+{index}"
    else:  # historical
        decades = ["1950s", "1960s", "1970s", "1980s", "1990s", "2000s"]
        decade = decades[index % len(decades)]
        return f"https://placehold.co/600x800/EEE/31343C?text={decade}+{occasion_term}+fashion"

def get_default_response(occasion="casual", body_type="slim"):
    """Generate a default response structure with better placeholders"""
    
    outfit_descriptions = [
        "A stylish ensemble featuring dark wash jeans paired with a light blue button-down shirt. Complete with brown leather loafers and a matching belt. Perfect for a relaxed yet put-together look.",
        "Khaki chinos paired with a navy polo shirt. Add white sneakers and a minimalist watch for a clean, casual aesthetic suitable for everyday wear.",
        "Black slim-fit jeans with a gray crew neck t-shirt and a light bomber jacket. Finish with black leather sneakers for a modern, versatile casual outfit."
    ]
    
    if occasion.lower() == "formal" or occasion.lower() == "wedding":
        outfit_descriptions = [
            "A tailored navy suit with a crisp white dress shirt and burgundy tie. Paired with polished black Oxford shoes and a matching leather belt. Add a silver tie clip for a refined detail.",
            "A charcoal gray three-piece suit with a light blue dress shirt and silver patterned tie. Complete with black cap-toe dress shoes and subtle silver cufflinks.",
            "A black tuxedo with a white dress shirt and black bow tie. Add patent leather formal shoes, silver cufflinks, and a white pocket square for classic elegance."
        ]
    elif occasion.lower() == "party":
        outfit_descriptions = [
            "Dark slim-fit jeans paired with a black button-up shirt and a tailored blazer. Complete with leather Chelsea boots and a minimal silver watch for a sophisticated party look.",
            "Tailored gray trousers with a vibrant patterned button-up shirt. Layer with a fitted black cardigan and add leather loafers for a stylish yet comfortable party outfit.",
            "Black chinos paired with a crisp white shirt and a colorful pocket square. Add leather dress boots and a statement watch for a balanced casual-formal party look."
        ]
    elif occasion.lower() == "business":
        outfit_descriptions = [
            "A light gray suit with a subtle check pattern, paired with a crisp light blue dress shirt and navy tie. Complete with brown leather Oxford shoes and a matching belt.",
            "Navy trousers with a white dress shirt and a textured blazer. Add brown leather loafers, a coordinating belt, and a simple silver watch for a polished business look.",
            "Charcoal dress pants paired with a light pink button-up and a navy knit tie. Complete with black cap-toe shoes and a minimalist leather portfolio for professional meetings."
        ]
    
    return {
        "outfit_suggestions": [
            {
                "image_url": generate_better_placeholder_images(occasion, body_type, "outfit", 1),
                "description": outfit_descriptions[0]
            },
            {
                "image_url": generate_better_placeholder_images(occasion, body_type, "outfit", 2),
                "description": outfit_descriptions[1]
            },
            {
                "image_url": generate_better_placeholder_images(occasion, body_type, "outfit", 3),
                "description": outfit_descriptions[2]
            }
        ],
        "historical_fashion": [
            {
                "year": "1950s",
                "image_url": generate_better_placeholder_images(occasion, body_type, "historical", 0)
            },
            {
                "year": "1970s",
                "image_url": generate_better_placeholder_images(occasion, body_type, "historical", 1)
            }
        ]
    }

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

Do not include image_url fields in your response. The system will generate those separately."""

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
                    default = get_default_response(occasion, body_type)
                    if 'outfit_suggestions' not in result:
                        result['outfit_suggestions'] = default['outfit_suggestions']
                    if 'historical_fashion' not in result:
                        result['historical_fashion'] = default['historical_fashion']
                else:
                    # Add image_url to each outfit suggestion
                    for i, outfit in enumerate(result['outfit_suggestions']):
                        outfit['image_url'] = generate_better_placeholder_images(occasion, body_type, "outfit", i+1)
                    
                    # Add image_url to each historical fashion item
                    for i, hist_item in enumerate(result['historical_fashion']):
                        hist_item['image_url'] = generate_better_placeholder_images(occasion, body_type, "historical", i)
                
                return format_response(200, result)
            except Exception as e:
                print(f"Error parsing AI response as JSON: {str(e)}")
                print(f"Raw AI response: {ai_response}")
                # Return default response if JSON parsing fails
                return format_response(200, get_default_response(occasion, body_type))
        
        except Exception as e:
            print(f"Error invoking Bedrock: {str(e)}")
            print(traceback.format_exc())
            # Return default response if Bedrock invocation fails
            return format_response(200, get_default_response(occasion, body_type))
    
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

echo "=== Lambda permissions update completed ==="
echo "The Lambda function has been updated with proper permissions and improved error logging."
echo ""
echo "Next steps:"
echo "1. Run ./fix-api-gateway.sh to ensure API Gateway is properly configured"
echo "2. Check CloudWatch logs for detailed error messages"

# Clean up
cd ..
rm -rf $TMP_DIR
rm -f bedrock-policy.json 