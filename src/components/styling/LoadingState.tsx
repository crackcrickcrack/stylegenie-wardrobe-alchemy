
import { Skeleton } from "@/components/ui/skeleton";

const LoadingState = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-medium mb-4 text-gold">Generating your style...</h3>
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
};

export default LoadingState;
