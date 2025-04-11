import { SubscriptionPage } from "@/components/pages/subscription-page";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Subscription() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <SubscriptionPage />
    </Suspense>
  );
}
