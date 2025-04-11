"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { PageHeader } from "../layouts/page-header";

import { useAuth } from "@/context/auth";
import { useWinery } from "@/context/winery";
import { useQRCodesLimit } from "@/hooks/use-qr-codes-limit";
import { Grape, LandPlot, Wine } from "lucide-react";
import { UpgradePlanDialog } from "../dialogs/upgrade-plan-dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Separator } from "@repo/ui/components/ui/separator";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export const DashboardHomePage = () => {
  const { t } = useTranslationHandler();
  const { user } = useAuth();
  const { winery } = useWinery();
  const { qrCodesLeft } = useQRCodesLimit();

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title={t("dashboardHome.headline")}
        subtitle={`${t("dashboardHome.subHeadline")} ${user?.displayName || user?.email || ""}`}
      />
      <Separator className="w-full" />
      <div>
        <Card className="shadow-none">
          <CardHeader></CardHeader>
          <CardContent>
            <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:justify-between lg:gap-0">
              <div className="flex w-full flex-col items-center gap-4 lg:flex-row">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={winery?.info?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-[#86F096] text-2xl text-primary-foreground">
                    {user?.displayName?.charAt(0).toUpperCase() ||
                      user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center gap-2 lg:items-start">
                  <p className="text-2xl font-bold lg:text-4xl">
                    {winery?.info?.name || "Winery Name"}
                  </p>
                  <p className="text-base text-muted-foreground">
                    {`${t("dashboardHome.avatarCard.foundedInText")} ${winery?.info?.foundedIn || "N/A"}`}
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-3 lg:items-end">
                <div className="flex items-center justify-start gap-1">
                  <p className="text-xs text-muted-foreground">
                    {t("dashboardHome.avatarCard.planText")}
                  </p>
                  <div className="flex items-center justify-center rounded-md bg-foreground px-2 py-1">
                    <p className="text-xs capitalize text-background">
                      {winery?.billing?.level || "N/A"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {`${qrCodesLeft} ${t("dashboardHome.avatarCard.qrCodesRemainingText")}`}
                  </p>
                </div>
                <div>
                  <UpgradePlanDialog />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t("dashboardHome.statCards.0.title")}</CardTitle>
            <Wine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {winery?.info?.wineCollections || "N/A"}
            </p>
          </CardContent>
          <CardFooter>
            {/* <p className="text-sm text-muted-foreground">
              Collections created since {winery?.info?.foundedIn || "N/A"}
            </p> */}
            <p className="text-sm text-muted-foreground">
              {t("dashboardHome.statCards.0.description")}
            </p>
          </CardFooter>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t("dashboardHome.statCards.1.title")}</CardTitle>
            <LandPlot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-start gap-2">
            <p className="text-4xl font-bold">
              {winery?.info?.vineyardsSurface || "N/A"}
            </p>
            <p className="text-4xl font-bold text-muted-foreground">
              {t("dashboardHome.statCards.1.unit")}
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {t("dashboardHome.statCards.1.description")}
            </p>
          </CardFooter>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t("dashboardHome.statCards.2.title")}</CardTitle>
            <Grape className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {winery?.info?.grapeVarieties || "N/A"}
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {t("dashboardHome.statCards.2.description")}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
