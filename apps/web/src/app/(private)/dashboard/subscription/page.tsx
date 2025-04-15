import { SubscriptionPage } from "@/components/pages/subscription-page";
import { Suspense } from "react";
import { LoadingPage } from "~/src/components/pages/loading-page";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Subscription() {
  return (
    <Suspense fallback={<LoadingPage containerHeight={400} />}>
      <SubscriptionPage />
    </Suspense>
  );
}
