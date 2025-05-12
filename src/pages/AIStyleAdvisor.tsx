import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import PhotoUpload from "@/components/styling/PhotoUpload";

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

// API endpoint for StyleGenieAI
const API_ENDPOINT = 'https://aaicj5k6zb.execute-api.us-east-1.amazonaws.com/prod/style-advisor';

const AIStyleAdvisor: React.FC = () => {
  const [occasion, setOccasion] = useState<string>('');
  const [bodyType, setBodyType] = useState<string>('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoS3Url, setPhotoS3Url] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [suggestions, setSuggestions] = useState<AIResponse | null>(null);
  const [apiDebug, setApiDebug] = useState<any>(null);

  useEffect(() => {
    console.log('AIStyleAdvisor component mounted');
    // Log the API endpoint being used
    console.log('API endpoint:', API_ENDPOINT);
  }, []);

  const handlePhotoUpload = (previewUrl: string | null, s3Url?: string) => {
    console.log("Photo upload handler called:", { previewUrl: previewUrl ? "[data]" : null, s3Url });
    setPhoto(previewUrl);
    if (s3Url) {
      setPhotoS3Url(s3Url);
    }
  };

  const getStyleSuggestions = async () => {
    if (!occasion || !bodyType) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    setApiDebug(null);

    try {
      // Prepare the request payload
      const payload = {
        occasion,
        body_type: bodyType,
        photo: photoS3Url || undefined // Use S3 URL instead of base64
      };

      console.log('Sending request with payload:', {
        ...payload,
        photo: photoS3Url ? photoS3Url : undefined
      });

      // Use the direct API endpoint instead of relative path
      console.log('Fetching from API endpoint:', API_ENDPOINT);
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          console.error('API Error Response:', errorData);
          setApiDebug({ status: response.status, error: errorData });
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          console.error('Could not parse error response as JSON');
        }
        throw new Error(errorMessage);
      }

      const responseText = await response.text();
      console.log('Raw response text:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('API Response:', data);
        setApiDebug({ responseData: data });
      } catch (e) {
        console.error('Error parsing response JSON:', e);
        throw new Error('Invalid response format from server');
      }

      // Validate the response structure
      if (!data.outfit_suggestions || !data.historical_fashion) {
        console.error('Invalid response structure:', data);
        throw new Error('The server response is missing required data');
      }

      // Check if image URLs are valid
      console.log('Validating image URLs');
      data.outfit_suggestions.forEach((outfit: OutfitSuggestion, index: number) => {
        console.log(`Outfit ${index+1} image URL:`, outfit.image_url);
        if (!outfit.image_url) {
          outfit.image_url = `https://placehold.co/600x800/EEE/31343C?text=Outfit+${index+1}`;
        }
      });

      data.historical_fashion.forEach((item: HistoricalFashion, index: number) => {
        console.log(`Historical ${index+1} image URL:`, item.image_url);
        if (!item.image_url) {
          item.image_url = `https://placehold.co/600x800/EEE/31343C?text=Historical+${index+1}`;
        }
      });

      setSuggestions(data);
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : 'Sorry, we couldn\'t generate suggestions at this time. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Style Advisor</h1>
      
      <Card className="p-6 mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Occasion</label>
            <Select onValueChange={setOccasion} value={occasion}>
              <SelectTrigger className="w-full">
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
            <Select onValueChange={setBodyType} value={bodyType}>
              <SelectTrigger className="w-full">
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
            <PhotoUpload 
              image={photo} 
              onImageChange={handlePhotoUpload} 
            />
          </div>

          <Button
            onClick={getStyleSuggestions}
            disabled={loading}
            className="w-full bg-gold hover:bg-gold/90 text-white font-medium"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Suggestions...
              </>
            ) : (
              'Generate Outfit'
            )}
          </Button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          {apiDebug && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mt-4">
              <p className="text-sm font-medium mb-2">API Debug Info:</p>
              <pre className="text-xs overflow-auto max-h-40">{JSON.stringify(apiDebug, null, 2)}</pre>
            </div>
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
                  <div className="mb-2 bg-gray-100 rounded-lg overflow-hidden" style={{ height: "250px" }}>
                    <img
                      src={outfit.image_url}
                      alt={outfit.description}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`Error loading image: ${outfit.image_url}`);
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x800/EEE/31343C?text=Outfit+${index+1}`;
                      }}
                    />
                  </div>
                  <p className="text-sm">{outfit.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Historical Fashion Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.historical_fashion.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="mb-2 bg-gray-100 rounded-lg overflow-hidden" style={{ height: "200px" }}>
                    <img
                      src={item.image_url}
                      alt={`Fashion from ${item.year}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`Error loading image: ${item.image_url}`);
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x800/EEE/31343C?text=${item.year}+Fashion`;
                      }}
                    />
                  </div>
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