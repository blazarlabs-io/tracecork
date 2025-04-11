"use client";

import { useExplorer } from "@/context/explorer";
import { ExplorerCard } from "./explorer-card";

export const Explorer = () => {
  // * HOOKS
  const { wines } = useExplorer();

  return (
    <div className="flex h-full w-full flex-col">
      {/* <ExplorerFilters /> */}
      <div className="mx-auto grid h-full gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {wines?.map((wine) => (
          <div key={wine.id}>
            {wine.status === "published" && <ExplorerCard wine={wine} />}
          </div>
        ))}
      </div>
    </div>
  );
};
