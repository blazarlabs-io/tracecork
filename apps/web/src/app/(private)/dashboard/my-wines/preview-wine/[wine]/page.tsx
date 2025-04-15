import { WinePreviewPage } from "@/components/pages/wine-preview-page";
import { Suspense } from "react";
import { LoadingPage } from "~/src/components/pages/loading-page";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Params = Promise<{ wine: string }>;

export default async function PreviewWinePage(props: { params: Params }) {
  const params = await props.params;

  if (!params) {
    return Response.json({
      success: false,
    });
  }

  const wine = params.wine;
  return (
    <Suspense fallback={<LoadingPage containerHeight={400} />}>
      <WinePreviewPage wineId={wine} />
    </Suspense>
  );
}
