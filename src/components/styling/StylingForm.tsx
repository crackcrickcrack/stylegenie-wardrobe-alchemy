
import { Button } from "@/components/ui/button";
import PhotoUpload from "./PhotoUpload";
import OccasionSelector from "./OccasionSelector";
import BodyTypeSelector from "./BodyTypeSelector";

type StylingFormProps = {
  image: string | null;
  occasion: string;
  bodyType: string;
  loading: boolean;
  onImageChange: (image: string | null) => void;
  onOccasionChange: (occasion: string) => void;
  onBodyTypeChange: (bodyType: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const StylingForm = ({
  image,
  occasion,
  bodyType,
  loading,
  onImageChange,
  onOccasionChange,
  onBodyTypeChange,
  onSubmit
}: StylingFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <PhotoUpload 
        image={image}
        onImageChange={onImageChange}
      />
      
      <OccasionSelector
        occasion={occasion}
        onOccasionChange={onOccasionChange}
      />
      
      <BodyTypeSelector
        bodyType={bodyType}
        onBodyTypeChange={onBodyTypeChange}
      />
      
      <Button 
        type="submit" 
        className="w-full bg-gold hover:bg-gold/90 text-white"
        disabled={loading}
      >
        {loading ? "Generating Outfit..." : "Generate Outfit"}
      </Button>
    </form>
  );
};

export default StylingForm;
