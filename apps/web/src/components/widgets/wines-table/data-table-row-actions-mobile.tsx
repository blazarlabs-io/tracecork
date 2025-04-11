"use client";

import { DeleteWineDialog } from "@/components/dialogs/delete-wine-dialog";
import { EditWineDialog } from "@/components/dialogs/edit-wine-dialog";
import { PublishWineDialog } from "@/components/dialogs/publish-wine-dialog";
import { RestoreWineDialog } from "@/components/dialogs/restore-wine-dialog";
import { SecurePublishWineDialog } from "@/components/dialogs/secure-publish-wine-dialog";
import { TokenizeWineDialog } from "@/components/dialogs/tokenize-wine-dialog";
import { UnpublishWineDialog } from "@/components/dialogs/unpublish-wine-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { db } from "@/lib/firebase/services/db";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

interface DataTableRowActionsProps<TData> {
  row: any;
}

export function DataTableRowActionsMobile<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <div className="flex items-center justify-end gap-1">
      {row.original.status === "draft" && <DraftMenu row={row} />}
      {row.original.status === "published" && <PublishedMenu row={row} />}
      {row.original.status === "archived" && <ArchivedMenu row={row} />}
    </div>
  );
}

const DraftMenu = ({ row }: any) => {
  const router = useRouter();

  const handleEdit = async () => {
    await db.wine.update(row.original.uid, row.original.id, {
      status: "draft",
      publicUrl: `/explore/wine/${row.original.id}`,
    });
    router.push(`/dashboard/my-wines/editor/${row.original.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mr-4">
        <EllipsisVertical size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        {/* <DropdownMenuItem
          onClick={() =>
            router.push(`/dashboard/my-wines/preview-wine/${row.original.id}`)
          }
        >
          Preview
        </DropdownMenuItem> */}
        <SecurePublishWineDialog
          uid={row.original.uid}
          wineId={row.original.id}
          collectionName={row.original.generalInfo.collectionName}
          isReadytoPublish={row.original.isReadytoPublish}
        >
          <span className="flex items-center py-1.5 pl-2 text-sm">Publish</span>
        </SecurePublishWineDialog>
        <DeleteWineDialog
          uid={row.original.uid}
          wineId={row.original.id}
          collectionName={row.original.generalInfo.collectionName}
        >
          <span className="flex items-center py-1.5 pl-6 text-sm">Delete</span>
        </DeleteWineDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ArchivedMenu = ({ row }: any) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mr-4">
        <EllipsisVertical size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <RestoreWineDialog
            uid={row.original.uid}
            wineId={row.original.id}
            collectionName={row.original.generalInfo.collectionName}
          >
            <span className="flex items-center py-1.5 pl-10 text-sm">
              Recover
            </span>
          </RestoreWineDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const PublishedMenu = ({ row }: any) => {
  const { t } = useTranslationHandler();
  const router = useRouter();

  const handleEdit = async () => {
    await db.wine.update(row.original.uid, row.original.id, {
      status: "draft",
      publicUrl: `/explore/wine/${row.original.id}`,
    });
    router.push(`/dashboard/my-wines/editor/${row.original.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mr-4">
        <EllipsisVertical size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <EditWineDialog
            uid={row.original.uid}
            wineId={row.original.id}
            collectionName={row.original.generalInfo.collectionName}
          >
            <span className="flex items-center py-1.5 pl-1 text-sm">
              {t("myWines.table.rowsActions.0.label")}
            </span>
          </EditWineDialog>
          {/* <DropdownMenuItem
            onClick={() =>
              router.push(`/dashboard/my-wines/preview-wine/${row.original.id}`)
            }
          >
            Preview
          </DropdownMenuItem> */}
          <UnpublishWineDialog
            uid={row.original.uid}
            wineId={row.original.id}
            collectionName={row.original.generalInfo.collectionName}
          >
            <span className="flex items-center py-1.5 pl-10 text-sm">
              {t("myWines.table.rowsActions.2.label")}
            </span>
          </UnpublishWineDialog>
          <TokenizeWineDialog uid={row.original.uid} wine={row.original}>
            <span className="flex items-center py-1.5 pl-8 text-sm">
              {t("myWines.table.rowsActions.3.label")}
            </span>
          </TokenizeWineDialog>
          <DeleteWineDialog
            uid={row.original.uid}
            wineId={row.original.id}
            collectionName={row.original.generalInfo.collectionName}
          >
            <span className="flex items-center py-1.5 pl-5 text-sm">
              {t("myWines.table.rowsActions.4.label")}
            </span>
          </DeleteWineDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
