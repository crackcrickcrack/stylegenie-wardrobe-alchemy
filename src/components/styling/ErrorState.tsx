
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  errorMessage: string;
  onRetry: () => void;
};

const ErrorState = ({ errorMessage, onRetry }: ErrorStateProps) => {
  return (
    <div className="text-center text-destructive">
      <h3 className="text-xl font-medium mb-2">Oops!</h3>
      <p>{errorMessage}</p>
      <Button 
        variant="outline" 
        className="mt-6 border-gold text-gold hover:bg-gold hover:text-white"
        onClick={onRetry}
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorState;
