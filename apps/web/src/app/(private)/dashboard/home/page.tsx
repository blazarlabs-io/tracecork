import { DashboardHomePage } from "@/components/pages/dashboard-home-page";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Home() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <DashboardHomePage />;
    </Suspense>
  );
}
