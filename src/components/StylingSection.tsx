
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import StylingForm from "./styling/StylingForm";
import StylingResults from "./styling/StylingResults";
import { OutfitSuggestion, HistoricalFashionItem } from "./styling/types";

const StylingSection = () => {
  const [image, setImage] = useState<string | null>(null);
  const [occasion, setOccasion] = useState<string>("");
  const [bodyType, setBodyType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [outfitSuggestions, setOutfitSuggestions] = useState<OutfitSuggestion[]>([]);
  const [historicalFashion, setHistoricalFashion] = useState<HistoricalFashionItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      toast({
        title: "Missing image",
        description: "Please upload a photo to continue",
        variant: "destructive",
      });
      return;
    }

    if (!occasion) {
      toast({
        title: "Occasion required",
        description: "Please select an occasion for your outfit",
        variant: "destructive",
      });
      return;
    }

    if (!bodyType) {
      toast({
        title: "Body type required",
        description: "Please select your body type to get personalized recommendations",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setError(null);
    setOutfitSuggestions([]);
    setHistoricalFashion([]);
    
    try {
      // Create the request body according to the API specification
      const requestBody = {
        occasion: occasion.toLowerCase(),
        body_type: bodyType.toLowerCase(),
        photo: image // Base64 image string
      };
      
      // Make the API call
      const response = await fetch("https://1hywq9b8na.execute-api.us-east-1.amazonaws.com/stage/StyleGenieAI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update state with the API response data
      if (data.outfit_suggestions) {
        setOutfitSuggestions(data.outfit_suggestions);
      }
      
      if (data.historical_fashion) {
        setHistoricalFashion(data.historical_fashion);
      }
      
      toast({
        title: "Styling Complete!",
        description: "Your personalized outfit has been generated.",
      });
    } catch (err) {
      console.error("Error fetching style suggestions:", err);
      setError("We couldn't generate suggestions at this time. Please try again.");
      toast({
        title: "Error",
        description: "Failed to get style recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="styling-section" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Get Styled in <span className="text-gold">Seconds</span>
        </h2>
        
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Our AI analyzes your photo, body type, and occasion to create the perfect outfit recommendation tailored just for you.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="p-6 border border-gray-200">
            <StylingForm
              image={image}
              occasion={occasion}
              bodyType={bodyType}
              loading={loading}
              onImageChange={setImage}
              onOccasionChange={setOccasion}
              onBodyTypeChange={setBodyType}
              onSubmit={handleSubmit}
            />
          </Card>
          
          <Card className="p-6 border border-gray-200 min-h-[400px] flex flex-col">
            <StylingResults
              loading={loading}
              error={error}
              outfitSuggestions={outfitSuggestions}
              historicalFashion={historicalFashion}
              onClearError={() => setError(null)}
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StylingSection;
