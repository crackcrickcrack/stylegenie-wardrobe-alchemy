
import { Skeleton } from "@/components/ui/skeleton";

const LoadingState = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <h3 className="text-2xl font-medium mb-4 text-crimson">Generating your style...</h3>
      <div className="space-y-6">
        <Skeleton className="h-14 w-full bg-muted/50 rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32 w-full bg-muted/50 rounded-md" />
          <Skeleton className="h-32 w-full bg-muted/50 rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Skeleton className="h-24 w-full bg-muted/50 rounded-md" />
          <Skeleton className="h-24 w-full bg-muted/50 rounded-md" />
          <Skeleton className="h-24 w-full bg-muted/50 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
