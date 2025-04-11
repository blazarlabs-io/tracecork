import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { X } from "lucide-react";
import { ExplorerFacetedFilter } from "./explorer-faceted-filter";
import { types } from "./data/data";

export const ExplorerFilters = () => {
  const isFiltered = false;
  return (
    <div className="flex h-[40px] w-full items-center px-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by collection name..."
          //   value={
          //     (table
          //       .getColumn("generalInfo_collectionName")
          //       ?.getFilterValue() as string) ?? ""
          //   }
          //   onChange={(event) =>
          //     table
          //       .getColumn("generalInfo_collectionName")
          //       ?.setFilterValue(event.target.value)
          //   }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <ExplorerFacetedFilter facets={[]} title="Wine Type" options={types} />

        {isFiltered && (
          <Button
            variant="ghost"
            // onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
    </div>
  );
};
