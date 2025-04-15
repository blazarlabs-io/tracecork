import { ManageAccountPage } from "@/components/pages/manage-account-page";
import { Suspense } from "react";
import { LoadingPage } from "~/src/components/pages/loading-page";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function ManageAccount() {
  return (
    <Suspense fallback={<LoadingPage containerHeight={400} />}>
      <ManageAccountPage />
    </Suspense>
  );
}
