import { WineStepper } from "@/components/widgets/wine-stepper";
import { Suspense } from "react";
import { LoadingPage } from "~/src/components/pages/loading-page";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Params = Promise<{ wine: string; step: string }>;
type SearchParams = Promise<{ step: "editor" | "preview" | "publish" }>;

export default async function Wine(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  if (!params || !searchParams) {
    return Response.json({
      success: false,
    });
  }

  const wine = params.wine;
  const step = searchParams.step;
  return (
    <Suspense fallback={<LoadingPage />}>
      <WineStepper wineId={wine} selectedStep={step} />
    </Suspense>
  );
}
