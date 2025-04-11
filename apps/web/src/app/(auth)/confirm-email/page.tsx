import { ConfirmEmailPage } from "@/components/pages/auth";
import { ConfirmEmailParamsType } from "@/types/authTypes";

type Params = Promise<{ mode: string }>;
type SearchParams = Promise<ConfirmEmailParamsType>;

export default async function ConfirmEmail(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  return <ConfirmEmailPage {...searchParams} />;
}
