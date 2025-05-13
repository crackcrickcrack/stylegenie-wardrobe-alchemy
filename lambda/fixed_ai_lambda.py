import json
import boto3
import base64
import uuid

# Initialize Bedrock client
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')
s3 = boto3.client('s3', region_name='us-east-1')

# Set model IDs
text_model_id = "anthropic.claude-instant-v1"
image_model_id = "stability.stable-diffusion-xl-v1"

# S3 bucket for storing images
S3_BUCKET = "stylegenie-uploads"

def build_prompt(occasion, body_type):
    return f"""
You are a professional fashion stylist.
Suggest 3 outfit ideas for a {body_type} body type for a {occasion} occasion.
Each suggestion should include a detailed description and suitable style notes.
Also include 2 historical fashion references related to this style.

Respond in JSON format with these exact keys:
- outfit_suggestions (list of dicts with 'description' field)
- historical_fashion (list of dicts with 'year' and 'description' fields)
"""

def upload_image_to_s3(image_data, prefix):
    """Upload base64 image to S3 and return the URL"""
    try:
        # Remove data URL prefix if present
        if image_data.startswith('data:image'):
            image_data = image_data.split(',')[1]
            
        # Decode base64 image
        image_bytes = base64.b64decode(image_data)
        
        # Generate unique filename
        filename = f"{prefix}-{uuid.uuid4()}.png"
        
        # Upload to S3
        s3.put_object(
            Bucket=S3_BUCKET,
            Key=filename,
            Body=image_bytes,
            ContentType='image/png',
            ACL='public-read'
        )
        
        # Return S3 URL
        return f"https://{S3_BUCKET}.s3.amazonaws.com/{filename}"
    except Exception as e:
        print(f"Error uploading image to S3: {str(e)}")
        return None

def generate_image(prompt):
    """Generate an image using Stability AI's SDXL model"""
    try:
        response = bedrock.invoke_model(
            modelId=image_model_id,
            body=json.dumps({
                "text_prompts": [{"text": prompt}],
                "cfg_scale": 8,
                "seed": 0,
                "steps": 30,
            })
        )
        
        response_body = json.loads(response['body'].read())
        if 'artifacts' in response_body and len(response_body['artifacts']) > 0:
            # Get the base64 encoded image
            return response_body['artifacts'][0]['base64']
        else:
            return None
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        return None

def lambda_handler(event, context):
    try:
        # Extract inputs
        body = json.loads(event["body"]) if event.get("body") else event
        occasion = body.get("occasion", "casual")
        body_type = body.get("body_type", "average")
        
        # Generate fashion advice using Claude Instant
        text_response = bedrock.invoke_model(
            modelId=text_model_id,
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 1000,
                "temperature": 0.7,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": build_prompt(occasion, body_type)
                            }
                        ]
                    }
                ]
            })
        )
        
        # Parse text response
        text_result = json.loads(text_response['body'].read())
        ai_response = text_result['content'][0]['text']
        
        # Extract JSON from text response
        if "```json" in ai_response:
            json_str = ai_response.split("```json")[1].split("```")[0].strip()
        elif "```" in ai_response:
            json_str = ai_response.split("```")[1].strip()
        else:
            json_str = ai_response
        
        fashion_data = json.loads(json_str)
        
        # Generate images for outfit suggestions
        for i, outfit in enumerate(fashion_data.get('outfit_suggestions', [])):
            image_prompt = f"Fashion outfit: {outfit.get('description')}. Style for {occasion} occasion, {body_type} body type. Professional fashion photography, detailed clothing, high quality."
            image_data = generate_image(image_prompt)
            
            if image_data:
                # Upload to S3 instead of including in response
                image_url = upload_image_to_s3(image_data, f"outfit-{i+1}")
                outfit['image_url'] = image_url or f"https://placehold.co/600x400/png?text=Outfit+Suggestion+{i+1}"
            else:
                outfit['image_url'] = f"https://placehold.co/600x400/png?text=Outfit+Suggestion+{i+1}"
        
        # Generate images for historical fashion
        for i, historical in enumerate(fashion_data.get('historical_fashion', [])):
            year = historical.get('year', '')
            image_prompt = f"Historical fashion from {year}: {historical.get('description')}. Professional fashion photography, vintage clothing, high quality."
            image_data = generate_image(image_prompt)
            
            if image_data:
                # Upload to S3 instead of including in response
                image_url = upload_image_to_s3(image_data, f"historical-{i+1}")
                historical['image_url'] = image_url or f"https://placehold.co/600x400/png?text={year}+Fashion"
            else:
                historical['image_url'] = f"https://placehold.co/600x400/png?text={year}+Fashion"
        
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True
            },
            "body": json.dumps(fashion_data)
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True
            },
            "body": json.dumps({"error": str(e)})
        }