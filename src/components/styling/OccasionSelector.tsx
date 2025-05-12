
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OccasionSelectorProps = {
  occasion: string;
  onOccasionChange: (occasion: string) => void;
};

const OccasionSelector = ({ occasion, onOccasionChange }: OccasionSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="occasion">Select an Occasion</Label>
      <Select value={occasion} onValueChange={onOccasionChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choose an occasion" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Wedding">Wedding</SelectItem>
          <SelectItem value="Casual">Casual</SelectItem>
          <SelectItem value="Party">Party</SelectItem>
          <SelectItem value="Interview">Interview</SelectItem>
          <SelectItem value="Date Night">Date Night</SelectItem>
          <SelectItem value="Business">Business</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default OccasionSelector;
