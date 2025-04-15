import { DashboardHomePage } from "@/components/pages/dashboard-home-page";
import { Suspense } from "react";
import { LoadingPage } from "~/src/components/pages/loading-page";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Home() {
  return (
    <Suspense fallback={<LoadingPage containerHeight={400} />}>
      <DashboardHomePage />;
    </Suspense>
  );
}
