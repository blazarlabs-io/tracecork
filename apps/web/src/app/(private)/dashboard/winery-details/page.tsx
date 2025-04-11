import { WineryDetailsPage } from "@/components/pages/winery-details-page";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function WineryDetails() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <WineryDetailsPage />
    </Suspense>
  );
}
