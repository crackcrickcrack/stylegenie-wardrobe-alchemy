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
}} 