import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Loader2, Upload, X } from "lucide-react";

interface OutfitSuggestion {
  image_url: string;
  description: string;
}

interface HistoricalFashion {
  year: string;
  image_url: string;
}

interface AIResponse {
  outfit_suggestions: OutfitSuggestion[];
  historical_fashion: HistoricalFashion[];
}

const AIStyleAdvisor: React.FC = () => {
  const [occasion, setOccasion] = useState<string>('');
  const [bodyType, setBodyType] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [suggestions, setSuggestions] = useState<AIResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStyleSuggestions = async () => {
    if (!occasion || !bodyType) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://1hywq9b8na.execute-api.us-east-1.amazonaws.com/stage/StyleGenieAI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          occasion,
          body_type: bodyType,
          photo: photo || undefined
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch style suggestions');
      }

      const data = await response.json();
      setSuggestions(data);
    } catch (err) {
      setError('Sorry, we couldn\'t generate suggestions at this time. Please try again.');
      console.error('Error fetching style suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Style Advisor</h1>
      
      <Card className="p-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Occasion</label>
            <Select onValueChange={setOccasion}>
              <SelectTrigger>
                <SelectValue placeholder="Select an occasion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="party">Party</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Body Type</label>
            <Select onValueChange={setBodyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select your body type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slim">Slim</SelectItem>
                <SelectItem value="curvy">Curvy</SelectItem>
                <SelectItem value="athletic">Athletic</SelectItem>
                <SelectItem value="petite">Petite</SelectItem>
                <SelectItem value="plus-size">Plus Size</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload Photo (Optional)</label>
            <div className="mt-2">
              {!photo ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gold transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={photo}
                    alt="Uploaded photo"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={handleRemovePhoto}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={getStyleSuggestions}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Suggestions...
              </>
            ) : (
              'Get Style Suggestions'
            )}
          </Button>

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
      </Card>

      {suggestions && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Outfit Suggestions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.outfit_suggestions.map((outfit, index) => (
                <Card key={index} className="p-4">
                  <img
                    src={outfit.image_url}
                    alt={outfit.description}
                    className="w-full h-64 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm">{outfit.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Historical Fashion Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {suggestions.historical_fashion.map((item, index) => (
                <Card key={index} className="p-4">
                  <img
                    src={item.image_url}
                    alt={`Fashion from ${item.year}`}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm font-medium">Year: {item.year}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIStyleAdvisor; 