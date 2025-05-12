
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type PhotoUploadProps = {
  image: string | null;
  onImageChange: (image: string | null) => void;
};

const PhotoUpload = ({ image, onImageChange }: PhotoUploadProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      onImageChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="photo">Upload Your Photo</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gold transition-colors cursor-pointer">
        {image ? (
          <div className="relative">
            <img 
              src={image} 
              alt="Uploaded" 
              className="mx-auto max-h-64 rounded" 
            />
            <button
              className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm border border-gray-300"
              onClick={() => onImageChange(null)}
              type="button"
            >
              Change
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center py-4">
              <svg 
                className="w-12 h-12 text-gray-400 mb-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG or WEBP (MAX. 5MB)
              </p>
            </div>
            <Input 
              id="photo" 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="block w-full opacity-0 absolute inset-0 cursor-pointer"
              aria-label="Upload photo"
            />
          </>
        )}
        <Label 
          htmlFor="photo" 
          className="sr-only"
        >
          Upload Photo
        </Label>
      </div>
    </div>
  );
};

export default PhotoUpload;
