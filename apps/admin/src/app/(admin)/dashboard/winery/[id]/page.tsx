import { DashboardWineryPage } from "../../../../../components/pages/dashboard-winery-page";
import db from "../../../../../../src/lib/firebase/services/db";
import { getSystemVariables } from "../../../../../lib/sanity/client";

type Params = Promise<{ id: string }>;

export default async function DashboardWinery(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  const winery = await db.winery.getOne(id);
  const systemVariables = await getSystemVariables();

  console.log("SYSTEM VARIABLES", systemVariables[0]);
  return (
    <DashboardWineryPage
      winery={JSON.parse(JSON.stringify(winery.data))}
      systemVariables={JSON.parse(JSON.stringify(systemVariables[0]))}
    />
  );
}
