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
  },
  {
    id: "tall",
    name: "Tall",
    image: "/images/body-types/tall-body-type.svg",
    description: "Taller than average height (typically 5'8\" and above for women, 6'2\" and above for men). Can have any body shape, but with longer proportions."
  },
  {
    id: "short",
    name: "Short",
    image: "/images/body-types/short-body-type.svg",
    description: "Below average height but with proportions different from petite. May have any body shape, but with shorter limbs and torso."
  },
  {
    id: "hourglass",
    name: "Hourglass",
    image: "/images/body-types/hourglass-body-type.svg",
    description: "Characterized by a well-defined waist with bust and hip measurements that are roughly equal. The shoulders are typically in line with the hips."
  },
  {
    id: "pear",
    name: "Pear",
    image: "/images/body-types/pear-body-type.svg",
    description: "Hip measurements are larger than bust measurements, with a defined waist. Weight is primarily carried in the lower body including hips, thighs, and buttocks."
  },
  {
    id: "apple",
    name: "Apple",
    image: "/images/body-types/apple-body-type.svg",
    description: "Weight is primarily carried in the midsection and upper body, with slimmer legs and hips. The waist is less defined with a rounder appearance."
  },
  {
    id: "rectangle",
    name: "Rectangle",
    image: "/images/body-types/rectangle-body-type.svg",
    description: "Shoulders, waist, and hips are approximately the same width, creating a straight silhouette. Less curvature at the waist compared to other body types."
  },
  {
    id: "inverted-triangle",
    name: "Inverted Triangle",
    image: "/images/body-types/inverted-triangle-body-type.svg",
    description: "Shoulders and bust are broader or fuller than the hips. Typically has a wider upper body with a narrow waist and slim legs."
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Body Type Guide</DialogTitle>
          <p className="text-gray-600">
            Select the body type that best matches your shape to get more accurate style recommendations.
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {bodyTypes.map((bodyType) => (
            <div 
              key={bodyType.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSelect(bodyType.id)}
            >
              <div className="p-3 bg-purple-50 h-40 flex items-center justify-center">
                <img 
                  src={bodyType.image} 
                  alt={`${bodyType.name} body type`} 
                  className="h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/150x200?text=${bodyType.name}`;
                  }}
                />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-lg text-purple-700 mb-1">{bodyType.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-3 mb-2">{bodyType.description}</p>
                <Button 
                  variant="ghost" 
                  className="mt-1 w-full text-purple-600 border border-purple-200 hover:bg-purple-50 text-sm py-1 h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(bodyType.id);
                  }}
                >
                  Select
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