"use client";

import { useResponsiveSize } from "@/hooks/use-responsive-size";
import { Flame, Pickaxe, RefreshCw } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTokenizer } from "~/src/context/tokenizer";
import { BurnTokenDialog } from "../../dialogs/burn-token-dialog";
import { UpdateTokenDialog } from "../../dialogs/update-token-dialog";
import { ViewTokenInfoDialog } from "../../dialogs/view-token-info-dialog";
import { DataTableRowActionsDesktop } from "./data-table-row-actions-desktop";
import { DataTableRowActionsMobile } from "./data-table-row-actions-mobile";

interface DataTableRowActionsProps<TData> {
  row: any;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { device } = useResponsiveSize();
  const { batchDetails, getBatch, batch } = useTokenizer();

  const mountRef = useRef<boolean>(false);

  useEffect(() => {
    if (
      !mountRef.current &&
      row.original.tokenization !== undefined &&
      row.original.tokenization.isTokenized
    ) {
      console.log("row", row.original.tokenization.tokenRefId);
      mountRef.current = true;
      getBatch(row.original.tokenization.tokenRefId);
    }
  }, []);

  if (device === "mobile") {
    return <DataTableRowActionsMobile row={row} />;
  } else {
    return (
      <div className="flex flex-col items-end justify-center gap-3 min-h-[102px] max-h-[102px]">
        {row.original.tokenization !== undefined &&
          row.original.tokenization.isTokenized &&
          batchDetails && (
            <div className="flex flex-row items-center justify-end gap-[10px] w-full">
              <UpdateTokenDialog
                batch={row.original.tokenization}
                batchDetails={batchDetails}
                wine={row.original}
              >
                <RefreshCw size={16} />
              </UpdateTokenDialog>
              <BurnTokenDialog
                wine={row.original}
                batchId={row.original.tokenization.tokenRefId}
                batchDetails={batchDetails}
              >
                <Flame size={16} />
              </BurnTokenDialog>
              <ViewTokenInfoDialog
                batch={row.original.tokenization}
                batchDetails={batchDetails}
              >
                <Pickaxe size={16} />
              </ViewTokenInfoDialog>
            </div>
          )}
        <DataTableRowActionsDesktop row={row} />
      </div>
    );
  }
}
