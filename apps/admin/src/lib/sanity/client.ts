/* eslint-disable turbo/no-undeclared-env-vars */
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN as string, // Needed for certain operations like updating content or accessing previewDrafts perspective
});

export const getSystemVariables = async () => {
  const data = await client.fetch('*[_type == "systemVariables"]');
  return data;
};
