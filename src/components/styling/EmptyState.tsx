import { Wand2 } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="text-center text-gray-600 flex flex-col items-center justify-center h-full">
      <div className="mb-6">
        <Wand2 className="h-16 w-16 text-purple-400" />
      </div>
      <h3 className="text-xl font-medium mb-2">Your Style Will Appear Here</h3>
      <p className="max-w-xs">Fill in your preferences and click "Generate" to receive AI-generated outfit suggestions.</p>
    </div>
  );
};

export default EmptyState;
