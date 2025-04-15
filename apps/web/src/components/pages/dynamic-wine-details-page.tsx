"use client";

import { useDynamicDomainHandler } from "@/hooks/qr-code-domain/use-dynamic-domain-handler";
import { LoadingPage } from "./loading-page";

export interface WineDetailsPageProps {
  wineId: string;
}

export const DynamicWineDetailsPage = ({ wineId }: WineDetailsPageProps) => {
  useDynamicDomainHandler(wineId);

  return <LoadingPage containerHeight={400} />;
};
