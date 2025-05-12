import { useState, useRef, useEffect } from "react";
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
  const [localImage, setLocalImage] = useState<string | null>(image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keep local state in sync with props
  useEffect(() => {
    setLocalImage(image);
  }, [image]);

  const uploadToS3 = async (file: File): Promise<string> => {
    try {
      console.log("Starting S3 upload for file:", file.name);
      
      // First, get a pre-signed URL from your backend
      // Using the proxy path for consistent access when deployed
      const response = await fetch('/upload/getUploadUrl', {
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
        console.error("Failed to get upload URL:", response.status, response.statusText);
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, fileUrl } = await response.json();
      console.log("Got pre-signed URL:", uploadUrl);

      // Upload the file to S3 using the pre-signed URL
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        console.error("Failed to upload to S3:", uploadResponse.status, uploadResponse.statusText);
        throw new Error('Failed to upload to S3');
      }

      console.log("Successfully uploaded to S3, file URL:", fileUrl);
      return fileUrl;
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw error;
    }
  };

  const processFile = async (file: File) => {
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
      // Read file for preview first
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const previewUrl = e.target?.result as string;
        // Update local preview immediately
        setLocalImage(previewUrl);
        
        try {
          // Try to upload to S3
          const s3Url = await uploadToS3(file);
          // Update parent component with both preview and S3 URL
          onImageChange(previewUrl, s3Url);
        } catch (err) {
          console.error("S3 upload failed:", err);
          // Still keep the preview image even if S3 upload fails
          onImageChange(previewUrl);
          setError("Failed to upload to S3, but preview is available");
        } finally {
          setUploading(false);
        }
      };
      
      reader.onerror = () => {
        setError("Failed to read file");
        setUploading(false);
      };
      
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("File processing error:", err);
      setError("Failed to process image");
      setUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalImage(null);
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
        onClick={() => !localImage && !uploading && fileInputRef.current?.click()}
      >
        {localImage ? (
          <div className="relative">
            <img 
              src={localImage} 
              alt="Uploaded" 
              className="mx-auto max-h-64 rounded object-cover" 
            />
            <button
              type="button"
              onClick={handleRemovePhoto}
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
