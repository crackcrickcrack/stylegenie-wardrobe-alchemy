import { Button } from "@/components/ui/button";
import OccasionSelector from "./OccasionSelector";
import BodyTypeSelector from "./BodyTypeSelector";
import { Sparkles } from "lucide-react";

type StylingFormProps = {
  occasion: string;
  bodyType: string;
  loading: boolean;
  onOccasionChange: (occasion: string) => void;
  onBodyTypeChange: (bodyType: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const StylingForm = ({
  occasion,
  bodyType,
  loading,
  onOccasionChange,
  onBodyTypeChange,
  onSubmit
}: StylingFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-6">
        <OccasionSelector
          occasion={occasion}
          onOccasionChange={onOccasionChange}
        />
        
        <BodyTypeSelector
          bodyType={bodyType}
          onBodyTypeChange={onBodyTypeChange}
        />
      </div>
      
      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full bg-gold hover:bg-gold/90 text-white h-12 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Generating Your Perfect Outfit...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate My Perfect Outfit
            </>
          )}
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-3">
          Our AI will create personalized outfit recommendations based on your selections
        </p>
      </div>
    </form>
  );
};

export default StylingForm;
