import { Button } from "@/components/ui/button";
import OccasionSelector from "./OccasionSelector";
import BodyTypeSelector from "./BodyTypeSelector";
import { Sparkles, Loader2 } from "lucide-react";

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
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-14 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-lg font-medium"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
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
