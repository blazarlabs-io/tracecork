import { LoaderCircle } from "lucide-react";

export type LoadingPageProps = {
  containerHeight?: number;
};

export const LoadingPage = ({ containerHeight = 800 }: LoadingPageProps) => {
  return (
    <div
      style={{ minHeight: containerHeight }}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <LoaderCircle className="animate-spin text-foreground" />
    </div>
  );
};
