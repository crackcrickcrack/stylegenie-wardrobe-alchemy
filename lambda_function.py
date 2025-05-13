import json
import boto3
import base64
from datetime import datetime

# Initialize clients
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')
s3_client = boto3.client('s3', region_name='us-east-1')

# S3 bucket for uploads if needed
S3_BUCKET = "stylegenie-uploads"

def lambda_handler(event, context):
    try:
        # Get input parameters from the event
        body = json.loads(event.get('body', '{}')) if event.get('body') else event
        body_type = body.get('body_type', 'average')
        occasion = body.get('occasion', 'casual')
        gender = body.get('gender', 'female')  # Default to 'female' if gender not provided
        country = body.get('country', 'global')  # Default to 'global' if country not provided
        age_range = body.get('age_range', 'adult')  # Default to 'adult' if age range not provided
        
        # Generate outfit description using Claude Instant
        outfit_description = generate_outfit_description(body_type, occasion, gender, country, age_range)
        
        # Generate image using Stability AI
        image_url = generate_outfit_image(outfit_description, body_type, occasion, gender, country, age_range)
        
        # Return the final output as a JSON response
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps({
                'outfit_description': outfit_description,
                'image_url': image_url
            })
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps({
                'error': str(e)
            })
        }

def generate_outfit_description(body_type, occasion, gender, country, age_range):
    """Generate outfit description using Claude Instant"""
    try:
        country_context = ""
        if country and country != "global":
            country_context = f" Your recommendation should incorporate fashion styles and trends popular in {country}."
            
        age_context = ""
        if age_range:
            age_mapping = {
                "teen": "teenagers (13-19 years)",
                "young-adult": "young adults (20-29 years)",
                "adult": "adults (30-45 years)",
                "mature": "mature adults (46-60 years)",
                "senior": "seniors (60+ years)"
            }
            age_group = age_mapping.get(age_range, "adults")
            age_context = f" The outfit should be age-appropriate for {age_group}."
        
        prompt = f"You are a professional fashion stylist. Suggest a stylish outfit for a {gender} with a {body_type} body type, suitable for a {occasion} occasion. The outfit should be modern, fashionable, and appropriate for the event.{country_context}{age_context}"
        
        response = bedrock.invoke_model(
            modelId="anthropic.claude-instant-v1",
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 300,
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
        
        response_body = json.loads(response['body'].read())
        return response_body['content'][0]['text']
    except Exception as e:
        print(f"Error generating outfit description: {str(e)}")
        return "A stylish outfit suitable for the occasion"

def upload_to_s3(image_data, prefix="fashion"):
    """Upload base64 image to S3 and return the URL"""
    try:
        # Decode base64 image
        image_bytes = base64.b64decode(image_data)
        
        # Generate unique filename
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        filename = f"{prefix}-{timestamp}.png"
        
        # Upload to S3
        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key=filename,
            Body=image_bytes,
            ContentType='image/png'
        )
        
        # Return S3 URL
        return f"https://{S3_BUCKET}.s3.amazonaws.com/{filename}"
    except Exception as e:
        print(f"Error uploading to S3: {str(e)}")
        return f"https://placehold.co/600x400/png?text=S3+Upload+Error"

def generate_outfit_image(outfit_description, body_type, occasion, gender, country, age_range):
    """Generate outfit image using Stability AI SDXL"""
    try:
        # Create image prompt
        country_style = ""
        if country and country != "global":
            country_style = f", {country} fashion style"
            
        age_style = ""
        if age_range:
            age_mapping = {
                "teen": "teen fashion",
                "young-adult": "young adult fashion",
                "adult": "adult fashion",
                "mature": "mature adult fashion",
                "senior": "senior fashion"
            }
            age_style = f", {age_mapping.get(age_range, 'adult fashion')}"
            
        image_prompt = f"Fashion outfit for {gender}: {outfit_description}. Style for {occasion} occasion, {body_type} body type{country_style}{age_style}. Professional fashion photography, detailed clothing, high quality."
        
        # Truncate prompt if it's too long
        if len(image_prompt) > 500:
            image_prompt = image_prompt[:500]
        
        # Call Stability AI
        response = bedrock.invoke_model(
            modelId="stability.stable-diffusion-xl-v1",
            body=json.dumps({
                "text_prompts": [{"text": image_prompt}],
                "cfg_scale": 8,
                "seed": 0,
                "steps": 30,
            })
        )
        
        # Process the response and upload to S3
        response_body = json.loads(response['body'].read())
        if 'artifacts' in response_body and len(response_body['artifacts']) > 0:
            image_data = response_body['artifacts'][0]['base64']
            # Upload to S3 and get the URL
            return upload_to_s3(image_data, f"outfit-{gender}-{country}-{age_range}-{body_type}-{occasion}")
        else:
            return "https://placehold.co/600x400/png?text=No+Image+Generated"
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        return "https://placehold.co/600x400/png?text=Image+Generation+Error" 