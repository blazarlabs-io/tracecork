import { WineDetailsPage } from "@/components/pages/wine-details-page";

type Params = Promise<{ id: string }>;

export default async function WineDetails(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  // const wine = await db.wine.getOne("L1IU5Ayr04VjwLPw094buGcUXZ93", id);
  // console.log(wine.data);
  // fs.writeFileSync("test.json", JSON.stringify(wine.data, null, 2));

  return <>{id && <WineDetailsPage wineId={id} />}</>;
}
