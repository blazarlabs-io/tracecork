/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { QrCode } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableColumnHeaderSimple } from "./data-table-column-header-simple";
import { DataTableRowActions } from "./data-table-row-actions";
import { statuses } from "./data/data";
import { TaskType } from "./data/schema";
import { QRCodeDialog } from "@/components/dialogs/qrcode-dialog";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export const columns = () => {
  const { t } = useTranslationHandler();

  const columnsAux: ColumnDef<TaskType>[] = [
    {
      accessorKey: "generalInfo.image",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      cell: ({ row }) => {
        return (
          <div className="w-[64px] relative">
            <img
              src={row.original.generalInfo.image}
              alt=""
              className="w-[64px] rounded-md ring-2 ring-muted ring-offset-2 ring-offset-background"
            />
            {(row.original as any).tokenization !== undefined &&
              (row.original as any).tokenization.isTokenized && (
                <img
                  src="/images/nft-badge.png"
                  alt=""
                  className="w-[24px] absolute bottom-[-16px] right-[-8px] z-10"
                />
              )}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "generalInfo.collectionName",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title={t("myWines.table.columns.0.header")}
          />
        );
      },
      cell: ({ row }) => {
        //   const label = labels.find((label) => label.value === row.original.label)
        return (
          <div className="flex flex-col items-start justify-start">
            <span className="max-w-[180px] truncate text-sm font-medium">
              {row.original.generalInfo.collectionName}
            </span>
            {row.original.generalInfo.grapeVarieties.length > 0 && (
              <>
                {row.original.generalInfo.grapeVarieties.map((grape, index) => (
                  <div key={grape.name}>
                    {index < 2 && (
                      <div className="flex max-w-[500px] items-center justify-start gap-2">
                        <span className="truncate text-xs text-muted-foreground">
                          {grape.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {grape.percentage}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                {row.original.generalInfo.grapeVarieties.length > 2 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-default text-xs text-primary">
                          +{row.original.generalInfo.grapeVarieties.length - 2}{" "}
                          more
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div>
                          {row.original.generalInfo.grapeVarieties.map(
                            (grape, index) => (
                              <div key={grape.name}>
                                <p>
                                  {grape.name} {grape.percentage}%
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("myWines.table.columns.1.header")}
        />
      ),
      cell: ({ row }) => {
        const status = statuses.find(
          (status) => status.value === row.getValue("status"),
        );

        if (!status) {
          return null;
        }
        const lastUpdated = row.original.lastUpdated as any;

        return (
          <div>
            <div className="flex w-[100px] items-center">
              {status.icon && (
                <status.icon className="mr-2 h-3 w-3 text-muted-foreground" />
              )}
              <span className="text-sm font-medium">{status.label}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {new Date(lastUpdated.seconds * 1000).toDateString()}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "publicUrl",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("myWines.table.columns.2.header")}
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <a className="text-sm font-medium" href={row.original.publicUrl}>
              {row.original.publicUrl || "Not available"}
            </a>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "qrCode",
      header: ({ column }) => (
        <DataTableColumnHeaderSimple
          column={column}
          title={t("myWines.table.columns.3.header")}
        />
      ),
      cell: ({ row }) => {
        // * DOWNLOAD QRCODE
        const handleDownloadQrCode = () => {
          const link = document.createElement("a");
          link.href = row.original.qrCode;
          link.download = `${row.original.generalInfo.collectionName}.png`;
          link.click();
        };

        return <QRCodeDialog url={row.original.qrCode} />;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return <DataTableRowActions row={row} />;
      },
    },
  ];

  return columnsAux;
};
