import { MyWinesPage } from "@/components/pages/my-wines-page";
import { Suspense } from "react";
import { LoadingPage } from "~/src/components/pages/loading-page";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function MyWines() {
  return (
    <Suspense fallback={<LoadingPage containerHeight={400} />}>
      <MyWinesPage />
    </Suspense>
  );
}
