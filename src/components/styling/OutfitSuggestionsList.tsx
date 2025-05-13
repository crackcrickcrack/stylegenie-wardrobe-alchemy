import { useState } from "react";
import { OutfitSuggestion } from "./types";
import { 
  Dialog, 
  DialogContent, 
  DialogOverlay
} from "@/components/ui/dialog";
import { X, Heart } from "lucide-react";

type OutfitSuggestionsListProps = {
  suggestions: OutfitSuggestion[];
};

const OutfitSuggestionsList = ({ suggestions }: OutfitSuggestionsListProps) => {
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitSuggestion | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  if (suggestions.length === 0) return null;

  const handleOpenOutfit = (outfit: OutfitSuggestion) => {
    setSelectedOutfit(outfit);
  };

  const handleCloseOutfit = () => {
    setSelectedOutfit(null);
  };
  
  const toggleFavorite = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-8">
      <h4 className="text-xl font-medium text-center">Outfit Suggestions</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {suggestions.map((outfit, index) => (
          <div 
            key={index} 
            className="group relative border border-gray-100 bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            onClick={() => handleOpenOutfit(outfit)}
          >
            <div className="absolute top-3 right-3 z-10">
              <button 
                onClick={(e) => toggleFavorite(e, index)}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm transition-colors hover:bg-white"
              >
                <Heart className={`h-5 w-5 ${favorites.includes(index) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
              </button>
            </div>
            
            {outfit.image_url ? (
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={outfit.image_url} 
                  alt={outfit.description} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                  <div className="p-5 w-full">
                    <p className="text-white font-medium line-clamp-2 text-lg">
                      {outfit.description.split('.')[0]}.
                    </p>
                    <div className="h-1 w-20 bg-gold mt-3 rounded-full"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-72 bg-gray-100 flex items-center justify-center">
                <p className="text-gray-400">No image available</p>
              </div>
            )}
            
            <div className="p-4 bg-white">
              <p className="text-sm text-gray-600 line-clamp-2">
                {outfit.description.split('.').slice(1).join('.').trim()}
              </p>
              <p className="mt-3 text-xs text-gold font-medium">Click to view details</p>
            </div>
          </div>
        ))}
      </div>

      {/* Image Popup Dialog */}
      <Dialog open={!!selectedOutfit} onOpenChange={() => selectedOutfit && handleCloseOutfit()}>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
        <DialogContent className="sm:max-w-2xl border-none bg-transparent shadow-none p-0 max-h-[90vh]">
          <button
            onClick={handleCloseOutfit}
            className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          {selectedOutfit && (
            <div className="flex flex-col items-center">
              {selectedOutfit.image_url && (
                <img
                  src={selectedOutfit.image_url}
                  alt={selectedOutfit.description}
                  className="max-h-[70vh] rounded-lg object-contain shadow-2xl"
                />
              )}
              
              <div className="mt-6 p-6 bg-white rounded-lg w-full max-w-2xl shadow-xl">
                <div className="w-10 h-1 bg-gold mx-auto mb-4 rounded-full"></div>
                <h3 className="text-2xl font-semibold mb-4 text-center">Outfit Details</h3>
                <p className="text-gray-700 leading-relaxed">{selectedOutfit.description}</p>
                
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Perfect For</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Casual', 'Evening', 'Work', 'Special Occasion'].map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OutfitSuggestionsList;
