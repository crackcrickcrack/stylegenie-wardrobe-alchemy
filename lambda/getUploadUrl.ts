import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({ region: 'us-east-1' });
const BUCKET_NAME = 'stylegenie-uploads';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    const { fileName, fileType } = JSON.parse(event.body);

    if (!fileName || !fileType) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ error: 'fileName and fileType are required' }),
      };
    }

    // Generate a unique file name
    const fileExtension = fileName.split('.').pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;

    // Create the S3 command
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: uniqueFileName,
      ContentType: fileType,
    });

    // Generate the pre-signed URL
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    // Return both the upload URL and the final file URL
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        uploadUrl,
        fileUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${uniqueFileName}`,
      }),
    };
  } catch (error) {
    console.error('Error generating upload URL:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error: 'Failed to generate upload URL' }),
    };
  }
}; 