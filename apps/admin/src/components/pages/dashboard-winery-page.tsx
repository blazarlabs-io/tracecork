"use client";

import { Separator } from "@repo/ui/components/ui/separator";
import { Header } from "@/components/sections/header";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import db from "@/lib/firebase/services/db";
import { useToast } from "@repo/ui/hooks/use-toast";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";

type DashboardWineryPageProps = {
  winery: any;
  systemVariables: any;
};

export const DashboardWineryPage = ({
  winery,
  systemVariables,
}: DashboardWineryPageProps) => {
  // * HOOKS
  const { toast } = useToast();

  // * HANDLERS
  const handleUpdatePlan = async (plan: string) => {
    const res = await db.winery.update(winery.id, { billing: { level: plan } });
    console.log(res);
    if (res.status === 200) {
      toast({
        title: "Plan updated successfully",
        description: `Winery ${winery.info.name || winery.id} has been updated to ${plan}`,
      });
    } else {
      toast({
        title: "Error updating plan",
        description: `Winery ${winery.info.name || winery.id} could not be updated to ${plan}`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {winery && winery !== undefined && (
        <div>
          <div className="flex items-center justify-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={winery?.info?.avatar} />
              <AvatarFallback>
                {winery?.info?.name.charAt(0).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <Header title={winery?.info?.name} description={winery.id} />
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col items-start justify-start gap-8 p-4">
            <div className="flex flex-col items-start justify-start gap-2">
              <span className="text-sm font-medium">Current Plan</span>
              <Select onValueChange={handleUpdatePlan}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={winery?.billing?.level} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {systemVariables?.pricing.map((plan: any) => (
                      <SelectItem key={plan._key} value={plan.name}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <span className="text-sm font-medium">Founded in</span>
              <span className="text-muted-foreground">
                {winery?.info?.foundedIn}
              </span>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <span className="text-sm font-medium">Collections</span>
              <span className="text-muted-foreground">
                {winery?.info?.wineCollections}
              </span>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <span className="text-sm font-medium">Grape Varieties</span>
              <span className="text-muted-foreground">
                {winery?.info?.grapeVarieties}
              </span>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <span className="text-sm font-medium">Vineyards Surface</span>
              <span className="text-muted-foreground">
                {winery?.info?.vineyardsSurface}
              </span>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <span className="text-sm font-medium">Bottles Produced</span>
              <span className="text-muted-foreground">
                {winery?.info?.bottlesProduced}
              </span>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <span className="text-sm font-medium">Representative</span>
              <span className="text-muted-foreground">
                {winery?.info?.representative.name}
              </span>
              <span className="text-muted-foreground">
                {winery?.info?.representative.email}
              </span>
              <span className="text-muted-foreground">
                {winery?.info?.representative.phone}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
