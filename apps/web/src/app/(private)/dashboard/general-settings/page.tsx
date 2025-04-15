import { GeneralSettingsPage } from "@/components/pages/general-settings-page";
import { Suspense } from "react";
import { LoadingPage } from "~/src/components/pages/loading-page";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Settings() {
  return (
    <Suspense fallback={<LoadingPage containerHeight={400} />}>
      <GeneralSettingsPage />
    </Suspense>
  );
}
