import { PasswordResetPage } from "@/components/pages/auth";
import { ConfirmEmailParamsType } from "@/types/authTypes";

type Params = Promise<{ mode: string }>;
type SearchParams = Promise<ConfirmEmailParamsType>;

export default async function PasswordResetSent(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  return <PasswordResetPage {...searchParams} />;
}
