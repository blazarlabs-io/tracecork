"use client";

import { useAuth } from "@/context/auth";
import { useWinery } from "@/context/winery";
import { useQRCodesLimit } from "@/hooks/use-qr-codes-limit";
import { useResponsiveSize } from "@/hooks/use-responsive-size";
import { Wine } from "@/types/db";
import { generateWineId } from "@/utils/wine-utils";
import { Plus, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
// import winesSaple from "@/data/wines-sample.json";
import { UpgradePlanDialog } from "../dialogs/upgrade-plan-dialog";
import { PageHeader } from "@/components/layouts/page-header";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import { WinesTable } from "@/components/widgets/wines-table";
import { columns } from "@/components/widgets/wines-table/columns";
// import { taskSchema } from "@/components/widgets/wines-table/data/schema";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import { cn } from "@repo/ui/lib/utils";

export const MyWinesPage = () => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const router = useRouter();
  const { user } = useAuth();
  const { wines } = useWinery();
  const { qrCodesLimit, qrCodesLeft } = useQRCodesLimit();
  const { device } = useResponsiveSize();

  // * STATES
  const [localWines, setLocalWines] = useState<any[]>([]);

  // * FUNCTIONS
  // const getLocalWines = () => {
  //   return z.array(taskSchema).parse(winesSaple);
  // };

  useEffect(() => {
    if (!user || !wines) return;
    const timeoutId = setTimeout(() => {
      setLocalWines(wines as Wine[]);
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, wines]);

  return (
    <div className={cn("flex w-full flex-col", "gap-2 md:gap-4 lg:gap-6")}>
      <div className="flex w-full items-center justify-between">
        <PageHeader
          title={t("myWines.headline")}
          subtitle={t("myWines.subHeadline")}
        />
        {qrCodesLimit && (
          <div className="flex flex-col items-end gap-2">
            <UpgradePlanDialog />
            <div className="flex items-center justify-end gap-1">
              {qrCodesLeft === 0 ? (
                <>
                  <QrCode size={14} className="text-destructive" />
                  {device === "mobile" ? (
                    <p className="pr-2 text-xs text-destructive">
                      {qrCodesLeft} / {qrCodesLimit}
                    </p>
                  ) : (
                    <p className="text-xs text-destructive">
                      {`${qrCodesLeft} / ${qrCodesLimit} ${t("myWines.qrCodesRemainingText")}`}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <QrCode size={14} className="text-muted-foreground" />
                  {device === "mobile" ? (
                    <p className="pr-2 text-xs text-muted-foreground">
                      {qrCodesLeft} / {qrCodesLimit}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      {`${qrCodesLeft} / ${qrCodesLimit} ${t("myWines.qrCodesRemainingText")}`}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Separator className="w-full" />
      <div className="flex items-center gap-4">
        <Button
          variant="dashed"
          onClick={() =>
            router.push(`/dashboard/my-wines/editor/${generateWineId()}`)
          }
        >
          <Plus size={16} className="text-foreground" />
          {t("myWines.addNewWineButtonLabel")}
        </Button>
      </div>
      {/* *TABLE */}
      {localWines && (
        <WinesTable
          data={localWines}
          columns={columns()}
          qrCodesLeft={qrCodesLeft}
        />
      )}
    </div>
  );
};
