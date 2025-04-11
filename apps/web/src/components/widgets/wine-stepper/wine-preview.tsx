"use client";

import { useHandleWineToEdit } from "@/hooks/use-handle-wine-to-edit";
import { Separator } from "@repo/ui/components/ui/separator";
import { useRouter } from "next/navigation";
import { WineDetailsPrivatePage } from "@/components/pages/wine-details-private-page";

export interface WinePreviewProps {
  wineId: string;
}
export const WinePreview = ({ wineId }: WinePreviewProps) => {
  // * HOOKS
  const { wine } = useHandleWineToEdit(wineId);
  const router = useRouter();

  // * HANDLERS
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {wine && <WineDetailsPrivatePage wineId={wine.id} />}
      <Separator className="w-full" />
    </div>
  );
};
