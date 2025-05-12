
import { OutfitSuggestion } from "./types";

type OutfitSuggestionsListProps = {
  suggestions: OutfitSuggestion[];
};

const OutfitSuggestionsList = ({ suggestions }: OutfitSuggestionsListProps) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-medium">Outfit Suggestions</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((outfit, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-md">
            {outfit.image_url ? (
              <img 
                src={outfit.image_url} 
                alt={outfit.description} 
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
            <p>{outfit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitSuggestionsList;
