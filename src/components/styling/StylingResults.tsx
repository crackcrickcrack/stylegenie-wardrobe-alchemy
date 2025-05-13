import { Button } from "@/components/ui/button";
import OutfitSuggestionsList from "./OutfitSuggestionsList";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import { OutfitSuggestion } from "./types";

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
      <div className="animate-enter space-y-6">
        <h3 className="text-2xl font-medium mb-4 text-crimson">Your Personalized Style</h3>
        
        <OutfitSuggestionsList suggestions={outfitSuggestions} />
        
        <Button 
          variant="outline" 
          className="mt-4 border-gold text-gold hover:bg-gold hover:text-dark-bg-alt"
        >
          Save This Style
        </Button>
      </div>
    );
  }
  
  // Default empty state
  return <EmptyState />;
};

export default StylingResults;
