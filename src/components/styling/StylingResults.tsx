
import { Button } from "@/components/ui/button";
import OutfitSuggestionsList from "./OutfitSuggestionsList";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import { OutfitSuggestion } from "./types";
import { Wand2 } from "lucide-react";

type StylingResultsProps = {
  loading: boolean;
  error: string | null;
  outfitSuggestions: OutfitSuggestion[];
  onClearError: () => void;
};

const StylingResults = ({ 
  loading, 
  error, 
  outfitSuggestions,
  onClearError
}: StylingResultsProps) => {
  if (loading) {
    return <LoadingState />;
  }
  
  if (error) {
    return <ErrorState errorMessage={error} onRetry={onClearError} />;
  }
  
  if (outfitSuggestions.length > 0) {
    return (
      <div className="animate-enter space-y-6 w-full max-w-full pb-16">
        <h3 className="text-2xl font-medium mb-4 text-crimson">Your Personalized Style</h3>
        
        <OutfitSuggestionsList suggestions={outfitSuggestions} />
        
        <Button 
          variant="outline" 
          className="mt-8 border-gold text-gold hover:bg-gold hover:text-dark-bg-alt"
        >
          Save This Style
        </Button>
      </div>
    );
  }
  
  // Improved empty state with full width
  return (
    <div className="text-center text-gray-600 flex flex-col items-center justify-center w-full h-full p-6 mb-12">
      <div className="mb-6">
        <Wand2 className="h-16 w-16 text-purple-400" />
      </div>
      <h3 className="text-xl font-medium mb-2">Your Style Will Appear Here</h3>
      <p className="max-w-md">Select your preferences and click "Generate" to receive AI outfit suggestions</p>
    </div>
  );
};

export default StylingResults;
