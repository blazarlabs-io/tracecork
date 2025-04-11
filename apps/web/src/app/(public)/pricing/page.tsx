import { PricingPage } from "@/components/pages/pricing-page";
import { db } from "@/lib/firebase/services/db";

export default async function Pricing() {
  const res = await db.systemVariables.getOne("pricing");
  return (
    <PricingPage
      pricing={JSON.parse(JSON.stringify({ data: res.data.pricing }))}
    />
  );
}
