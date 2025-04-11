"use client";

import { useHandleWineToEdit } from "@/hooks/use-handle-wine-to-edit";
import { ChevronLeft, Clock, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { DraftIcon } from "../icons/draft";
import { PublishedIcon } from "../icons/published";
import { PageHeader } from "../layouts/page-header";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import { WineDetailsPrivatePage } from "./wine-details-private-page";
import { EditWineDialog } from "../dialogs/edit-wine-dialog";
import { PublishWineDialog } from "../dialogs/publish-wine-dialog";
import { UnpublishWineDialog } from "../dialogs/unpublish-wine-dialog";
import { SecurePublishWineDialog } from "../dialogs/secure-publish-wine-dialog";

export interface WinePreviewPageProps {
  wineId: string;
}
export const WinePreviewPage = ({ wineId }: WinePreviewPageProps) => {
  // * HOOKS
  const { wine } = useHandleWineToEdit(wineId);
  const router = useRouter();

  // * HANDLERS
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full items-center justify-between">
        <PageHeader
          title="Preview Wine"
          subtitle="Preview your wine details before publishing."
        />
        {wine && (
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              {wine.status === "draft" ? (
                <DraftIcon className="h-3 w-3" />
              ) : (
                <PublishedIcon className="h-3 w-3" />
              )}
              <span className="text-sm capitalize">{wine.status}</span>
              <EditWineDialog
                uid={wine.uid}
                wineId={wine.id}
                status={wine.status}
                collectionName={wine.generalInfo.collectionName}
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background p-[10px] shadow-sm hover:bg-accent hover:text-accent-foreground">
                  <Pencil size={16} />
                </div>
              </EditWineDialog>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {new Date(wine.lastUpdated?.seconds * 1000).toDateString()}
              </span>
            </div>
          </div>
        )}
      </div>
      <Separator className="w-full" />
      <div className="flex w-full items-center justify-start">
        <button
          onClick={handleBack}
          className="flex min-w-fit items-center gap-2 rounded-md px-3 py-2 transition-all duration-300 ease-in-out hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </button>
      </div>
      {wine && <WineDetailsPrivatePage wineId={wine.id} />}
      <Separator className="w-full" />
      {wine && (
        <>
          {wine.status === "draft" && (
            <div className="flex w-full items-center justify-end">
              <SecurePublishWineDialog
                uid={wine.uid}
                wineId={wine.id}
                isReadytoPublish={wine.isReadyToPublish}
                collectionName={wine.generalInfo.collectionName}
              >
                <div className="flex min-h-10 min-w-32 items-center justify-center rounded-md bg-primary font-medium text-primary-foreground transition duration-200 ease-in-out hover:bg-primary/80">
                  Publish
                </div>
              </SecurePublishWineDialog>
            </div>
          )}
          {wine.status === "published" && (
            <div className="flex w-full items-center justify-end">
              <UnpublishWineDialog
                uid={wine.uid}
                wineId={wine.id}
                collectionName={wine.generalInfo.collectionName}
              >
                <div className="min-h-10 min-w-32 items-center justify-center rounded-md bg-destructive font-medium text-primary-foreground transition duration-200 ease-in-out hover:bg-destructive/80">
                  Unpublish
                </div>
              </UnpublishWineDialog>
            </div>
          )}
        </>
      )}
    </div>
  );
};
