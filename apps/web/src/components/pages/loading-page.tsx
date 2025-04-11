import { LoaderCircle } from "lucide-react";

export const LoadingPage = () => {
  return (
    <div className="flex h-full min-h-[800px] w-full flex-col items-center justify-center">
      <LoaderCircle className="animate-spin text-foreground" />
    </div>
  );
};
