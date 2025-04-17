import { helix } from "ldrs";
import { TokenAction } from "~/src/types/db";

helix.register();

export type TokenizingLoaderProps = {
  action: TokenAction;
  title: string;
  message: string;
};

export const TokenizingLoader = ({
  action,
  title,
  message,
}: TokenizingLoaderProps) => {
  return (
    <div className="bg-background animate-bounce shadow-md flex items-center justify-start gap-4 rounded-md min-w-[320px]">
      <div
        style={{
          backgroundColor:
            action === "create"
              ? "#31cece"
              : action === "update"
                ? "#d4f9ae"
                : action === "burn"
                  ? "#e05c5c"
                  : "#3B82F6",
        }}
        className="flex items-center justify-center h-[88px] bg-primary p-3 rounded-l-md"
      >
        <l-helix size="48" speed="2.0" color="white"></l-helix>
      </div>
      <div className="flex flex-col items-start justify-center gap-1 max-w-56 pr-6 py-4">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs">{message}</p>
      </div>
    </div>
  );
};
