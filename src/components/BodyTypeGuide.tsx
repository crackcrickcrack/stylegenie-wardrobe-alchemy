import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";

const bodyTypes = [
  {
    id: "slim",
    name: "Slim",
    image: "/images/body-types/slim-body-type.svg",
    description: "Characterized by a naturally lean frame with minimal curves. Shoulders and hips are typically in line with each other, and weight is evenly distributed."
  },
  {
    id: "curvy",
    name: "Curvy",
    image: "/images/body-types/curvy-body-type.svg",
    description: "Features well-defined curves with a smaller waist in proportion to the bust and hips. The hip and bust measurements are often similar with a defined waistline."
  },
  {
    id: "athletic",
    name: "Athletic",
    image: "/images/body-types/athletic-body-type.svg",
    description: "Typically has broader shoulders and a strong, muscular build. Often has a straighter waist and hips with more muscle definition throughout the body."
  },
  {
    id: "petite",
    name: "Petite",
    image: "/images/body-types/petite-body-type.svg",
    description: "Refers to a smaller overall frame, usually 5'4\" or under in height. Can have any body shape, but on a smaller scale with shorter proportions."
  },
  {
    id: "plus-size",
    name: "Plus Size",
    image: "/images/body-types/plus-size-body-type.svg",
    description: "Features fuller proportions throughout the body. May carry weight evenly or in specific areas like bust, midsection, or hips."
  }
];

interface BodyTypeGuideProps {
  onSelectBodyType?: (bodyType: string) => void;
}

const BodyTypeGuide: React.FC<BodyTypeGuideProps> = ({ onSelectBodyType }) => {
  const [open, setOpen] = useState(false);
  
  const handleSelect = (bodyTypeId: string) => {
    if (onSelectBodyType) {
      onSelectBodyType(bodyTypeId);
    }
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-2 h-8 w-8 rounded-full p-0"
          title="View body type guide"
        >
          <InfoIcon className="h-4 w-4" />
          <span className="sr-only">View body type guide</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Body Type Guide</DialogTitle>
          <p className="text-gray-600">
            Select the body type that best matches your shape to get more accurate style recommendations.
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {bodyTypes.map((bodyType) => (
            <div 
              key={bodyType.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSelect(bodyType.id)}
            >
              <div className="p-4 bg-purple-50 h-48 flex items-center justify-center">
                <img 
                  src={bodyType.image} 
                  alt={`${bodyType.name} body type`} 
                  className="h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x300?text=${bodyType.name}`;
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-purple-700 mb-2">{bodyType.name}</h3>
                <p className="text-sm text-gray-600">{bodyType.description}</p>
                <Button 
                  variant="ghost" 
                  className="mt-3 w-full text-purple-600 border border-purple-200 hover:bg-purple-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(bodyType.id);
                  }}
                >
                  Select this body type
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BodyTypeGuide; 