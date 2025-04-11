import { GeneralSettingsPage } from "@/components/pages/general-settings-page";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Settings() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <GeneralSettingsPage />
    </Suspense>
  );
}
