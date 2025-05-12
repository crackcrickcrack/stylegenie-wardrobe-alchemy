import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";

type PhotoUploadProps = {
  image: string | null;
  onImageChange: (image: string | null, s3Url?: string) => void;
};

const PhotoUpload = ({ image, onImageChange }: PhotoUploadProps) => {
  const [error, setError] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToS3 = async (file: File): Promise<string> => {
    try {
      // First, get a pre-signed URL from your backend
      const response = await fetch('https://1hywq9b8na.execute-api.us-east-1.amazonaws.com/stage/getUploadUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, fileUrl } = await response.json();

      // Upload the file to S3 using the pre-signed URL
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload to S3');
      }

      return fileUrl;
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw error;
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (PNG, JPG, or WEBP)");
      return;
    }

    setError("");
    setUploading(true);

    try {
      // Read the file for preview
      const reader = new FileReader();
      reader.onload = async () => {
        const previewUrl = reader.result as string;
        
        // Upload to S3
        const s3Url = await uploadToS3(file);
        
        // Call onImageChange with both preview and S3 URL
        onImageChange(previewUrl, s3Url);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (PNG, JPG, or WEBP)");
      return;
    }

    setError("");
    setUploading(true);

    try {
      // Read the file for preview
      const reader = new FileReader();
      reader.onload = async () => {
        const previewUrl = reader.result as string;
        
        // Upload to S3
        const s3Url = await uploadToS3(file);
        
        // Call onImageChange with both preview and S3 URL
        onImageChange(previewUrl, s3Url);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setError("");
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="photo">Upload Your Photo</Label>
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gold transition-colors cursor-pointer bg-gray-50"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !image && !uploading && fileInputRef.current?.click()}
      >
        {image ? (
          <div className="relative">
            <img 
              src={image} 
              alt="Uploaded" 
              className="mx-auto max-h-64 rounded object-cover" 
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemovePhoto();
              }}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center py-4">
              {uploading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mb-3"></div>
                  <p className="text-sm text-gray-600">Uploading...</p>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG or WEBP (MAX. 5MB)
                  </p>
                </>
              )}
            </div>
            <Input 
              ref={fileInputRef}
              id="photo" 
              type="file" 
              accept="image/png,image/jpeg,image/webp" 
              onChange={handleImageChange}
              className="hidden"
              disabled={uploading}
            />
          </>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default PhotoUpload;
