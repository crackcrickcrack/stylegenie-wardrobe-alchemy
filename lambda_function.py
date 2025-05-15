import json
import boto3
import base64
from datetime import datetime

# Initialize AWS clients
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')
s3_client = boto3.client('s3', region_name='us-east-1')

# S3 bucket for image uploads
S3_BUCKET = "stylegenie-uploads"

def lambda_handler(event, context):
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}')) if event.get('body') else event
        body_type = body.get('body_type', 'average')
        occasion = body.get('occasion', 'casual')
        gender = body.get('gender', 'female')
        country = body.get('country', 'global')
        age_range = body.get('age_range', 'adult')
        extra_details = body.get('extra_details', '')  # Get extra details from request

        # Generate outputs
        outfit_description = generate_outfit_description(body_type, occasion, gender, country, age_range, extra_details)
        image_url = generate_outfit_image(outfit_description, body_type, occasion, gender, country, age_range, extra_details)

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
            'body': json.dumps({'error': str(e)})
        }

def generate_outfit_description(body_type, occasion, gender, country, age_range, extra_details):
    try:
        country_context = f" Your recommendation should incorporate fashion styles and trends popular in {country}." if country and country != "global" else ""
        age_mapping = {
            "teen": "teenagers (13–19 years)",
            "young-adult": "young adults (20–29 years)",
            "adult": "adults (30–45 years)",
            "mature": "mature adults (46–60 years)",
            "senior": "seniors (60+ years)"
        }
        age_context = f" The outfit should be age-appropriate for {age_mapping.get(age_range, 'adults')}."
        
        # Add extra details context if provided
        extra_context = f" Additional preferences: {extra_details}." if extra_details else ""

        prompt = (
            f"You are a professional fashion stylist. Suggest a stylish outfit for a {gender} "
            f"with a {body_type} body type, suitable for a {occasion} occasion. "
            f"The outfit should be modern, fashionable, and appropriate for the event."
            f"{country_context}{age_context}{extra_context}"
        )

        response = bedrock.invoke_model(
            modelId="anthropic.claude-instant-v1",
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 300,
                "temperature": 0.7,
                "messages": [
                    {"role": "user", "content": [{"type": "text", "text": prompt}]}
                ]
            })
        )

        response_body = json.loads(response['body'].read())
        return response_body['content'][0]['text']
    except Exception as e:
        print(f"Error generating outfit description: {str(e)}")
        return "A stylish outfit suitable for the occasion."

def generate_outfit_image(outfit_description, body_type, occasion, gender, country, age_range, extra_details):
    try:
        country_style = f", {country} fashion style" if country and country != "global" else ""
        age_style_map = {
            "teen": "teen fashion",
            "young-adult": "young adult fashion",
            "adult": "adult fashion",
            "mature": "mature adult fashion",
            "senior": "senior fashion"
        }
        age_style = f", {age_style_map.get(age_range, 'adult fashion')}"
        
        # Add extra details to image prompt if provided
        extra_style = f", {extra_details}" if extra_details else ""

        image_prompt = (
            f"A full-body portrait of a {gender} with a {body_type} body type, standing pose, "
            f"visible head to toe, perfect human anatomy, natural lighting, realistic skin texture, DSLR photo, Canon EOS R5, "
            f"wearing: {outfit_description}. {occasion} theme{country_style}{age_style}{extra_style}, "
            f"high resolution, hyper-realistic, clean background, 85mm lens, fashionable look"
        )

        # Truncate prompt to meet model limits
        if len(image_prompt) > 500:
            image_prompt = image_prompt[:500]

        # Negative prompt to reduce deformities
        negative_prompt = (
            "extra limbs, extra fingers, missing hands, distorted body, deformed face, mutated anatomy, "
            "bad proportions, blurry, cloned hands, broken pose, duplicate arms"
        )

        payload = {
            "text_prompts": [{"text": image_prompt}],
            "cfg_scale": 9,
            "seed": 0,
            "steps": 40,
            "negative_prompt": negative_prompt
        }

        response = bedrock.invoke_model(
            modelId="stability.stable-diffusion-xl-v1",
            body=json.dumps(payload),
            contentType="application/json",
            accept="application/json"
        )

        response_body = json.loads(response['body'].read())

        if 'artifacts' in response_body and response_body['artifacts']:
            image_data = response_body['artifacts'][0]['base64']
            return upload_to_s3(image_data, f"outfit-{gender}-{country}-{age_range}-{body_type}-{occasion}")
        else:
            return "https://placehold.co/600x400/png?text=No+Image+Generated"
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        return "https://placehold.co/600x400/png?text=Image+Generation+Error"

def upload_to_s3(image_data, prefix="fashion"):
    try:
        image_bytes = base64.b64decode(image_data)
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        filename = f"{prefix}-{timestamp}.png"

        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key=filename,
            Body=image_bytes,
            ContentType='image/png'
        )

        return f"https://{S3_BUCKET}.s3.amazonaws.com/{filename}"
    except Exception as e:
        print(f"Error uploading to S3: {str(e)}")
        return "https://placehold.co/600x400/png?text=S3+Upload+Error"
