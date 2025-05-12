
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BodyTypeSelectorProps = {
  bodyType: string;
  onBodyTypeChange: (bodyType: string) => void;
};

const BodyTypeSelector = ({ bodyType, onBodyTypeChange }: BodyTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="bodyType">Select Your Body Type</Label>
      <Select value={bodyType} onValueChange={onBodyTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select your body type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Athletic">Athletic</SelectItem>
          <SelectItem value="Petite">Petite</SelectItem>
          <SelectItem value="Curvy">Curvy</SelectItem>
          <SelectItem value="Tall">Tall</SelectItem>
          <SelectItem value="Plus Size">Plus Size</SelectItem>
          <SelectItem value="Slim">Slim</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BodyTypeSelector;
