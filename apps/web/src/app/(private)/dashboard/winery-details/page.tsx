import { WineryDetailsPage } from "@/components/pages/winery-details-page";
import { Suspense } from "react";
import { LoadingPage } from "~/src/components/pages/loading-page";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function WineryDetails() {
  return (
    <Suspense fallback={<LoadingPage containerHeight={400} />}>
      <WineryDetailsPage />
    </Suspense>
  );
}
