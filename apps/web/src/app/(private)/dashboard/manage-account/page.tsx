import { ManageAccountPage } from "@/components/pages/manage-account-page";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function ManageAccount() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <ManageAccountPage />
    </Suspense>
  );
}
