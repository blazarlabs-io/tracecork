"use client";

import { DeleteWineDialog } from "@/components/dialogs/delete-wine-dialog";
import { EditWineDialog } from "@/components/dialogs/edit-wine-dialog";
import { PublishWineDialog } from "@/components/dialogs/publish-wine-dialog";
import { RestoreWineDialog } from "@/components/dialogs/restore-wine-dialog";
import { SecurePublishWineDialog } from "@/components/dialogs/secure-publish-wine-dialog";
import { TokenizeWineDialog } from "@/components/dialogs/tokenize-wine-dialog";
import { UnpublishWineDialog } from "@/components/dialogs/unpublish-wine-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import { db } from "@/lib/firebase/services/db";
import {
  ArchiveRestore,
  BookCheck,
  BookDashed,
  Eye,
  Network,
  Pencil,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import { useAuth } from "@/context/auth";
import { useEffect } from "react";
import { useUpdateTokenizedInDb } from "~/src/hooks/use-update-tokenized-in-db";
import { useTokenizer } from "~/src/context/tokenizer";
import { TokenAction } from "~/src/types/db";

interface DataTableRowActionsProps<TData> {
  row: any;
}

export function DataTableRowActionsDesktop<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { user } = useAuth();
  const { statusMonitor, action, previousAction, updateAction } =
    useTokenizer();

  const handleUpdateTokenizedInDb = (action: TokenAction) => {
    updateAction(action);
  };

  // * Update DB with tokenization data reactive to statusMonitor changes
  useUpdateTokenizedInDb(
    statusMonitor,
    previousAction === "burn" ? false : true,
    action,
    handleUpdateTokenizedInDb,
  );

  return (
    <div className="flex items-center justify-end gap-1">
      {row.original.status === "draft" && (
        <>
          <EditWine row={row} />
          <PublishWine row={row} />
          <DeleteWine row={row} />
        </>
      )}
      {row.original.status === "published" && (
        <>
          <EditWineWithDialog row={row} />
          <PreviewWine row={row} />
          {user &&
            user.uid === "3ABS7fc8Xng8JeLlTWQv2fH0Q3d2" &&
            (row.original.tokenization === undefined ||
              !row.original.tokenization?.isTokenized) && (
              <TokenizeWine row={row} />
            )}
          <UnpublishWine row={row} />
          <DeleteWine row={row} />
        </>
      )}
      {row.original.status === "archived" && (
        <>
          <RestoreWine row={row} />
        </>
      )}
    </div>
  );
}

const EditWine = ({ row }: any) => {
  const { t } = useTranslationHandler();
  const router = useRouter();

  const handleEdit = async () => {
    await db.wine.update(row.original.uid, row.original.id, {
      status: "draft",
      publicUrl: `/explore/wine/${row.original.id}`,
    });
    // router.push(`/dashboard/my-wines/wine-editor/${row.original.id}`);
    router.push(`/dashboard/my-wines/editor/${row.original.id}`);
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger
          onClick={handleEdit}
          asChild
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-input bg-background p-[10px] shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          <Pencil size={16} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("myWines.table.rowsActions.0.tooltip")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const EditWineWithDialog = ({ row }: any) => {
  return (
    <EditWineDialog
      uid={row.original.uid}
      wineId={row.original.id}
      collectionName={row.original.generalInfo.collectionName}
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background p-[10px] shadow-sm hover:bg-accent hover:text-accent-foreground">
        <Pencil size={16} />
      </div>
    </EditWineDialog>
  );
};

const PreviewWine = ({ row }: any) => {
  const router = useRouter();
  const handlePreview = () => {
    router.push(`/dashboard/my-wines/preview-wine/${row.original.id}`);
  };
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger
          asChild
          onClick={handlePreview}
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-input bg-background p-[10px] shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          <Eye size={16} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Preview wine</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const PublishWine = ({ row }: any) => {
  return (
    <SecurePublishWineDialog
      uid={row.original.uid}
      wineId={row.original.id}
      collectionName={row.original.generalInfo.collectionName}
      isReadytoPublish={row.original.isReadyToPublish}
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background p-[10px] shadow-sm hover:bg-accent hover:text-accent-foreground">
        <BookCheck size={16} />
      </div>
    </SecurePublishWineDialog>
  );
};

const UnpublishWine = ({ row }: any) => {
  return (
    <UnpublishWineDialog
      uid={row.original.uid}
      wineId={row.original.id}
      collectionName={row.original.generalInfo.collectionName}
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background p-[10px] shadow-sm hover:bg-accent hover:text-accent-foreground">
        <BookDashed size={16} />
      </div>
    </UnpublishWineDialog>
  );
};

const DeleteWine = ({ row }: any) => {
  return (
    <DeleteWineDialog
      uid={row.original.uid}
      wineId={row.original.id}
      collectionName={row.original.generalInfo.collectionName}
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background p-[10px] shadow-sm hover:bg-accent hover:text-accent-foreground">
        <Trash2 size={16} />
      </div>
    </DeleteWineDialog>
  );
};

const RestoreWine = ({ row }: any) => {
  return (
    <RestoreWineDialog
      uid={row.original.uid}
      wineId={row.original.id}
      collectionName={row.original.generalInfo.collectionName}
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background p-[10px] shadow-sm hover:bg-accent hover:text-accent-foreground">
        <ArchiveRestore size={16} />
      </div>
    </RestoreWineDialog>
  );
};

const TokenizeWine = ({ row }: any) => {
  return (
    <TokenizeWineDialog uid={row.original.uid} wine={row.original}>
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background p-[10px] shadow-sm hover:bg-accent hover:text-accent-foreground">
        <Network size={16} />
      </div>
    </TokenizeWineDialog>
  );
};
