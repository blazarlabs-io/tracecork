import { MyWinesPage } from "@/components/pages/my-wines-page";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function MyWines() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <MyWinesPage />
    </Suspense>
  );
}
