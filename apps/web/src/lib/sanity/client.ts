/* eslint-disable turbo/no-undeclared-env-vars */
import { createClient } from "@sanity/client";
import {
  NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_TOKEN,
} from "@/utils/envConstants";

export const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  token: NEXT_PUBLIC_SANITY_TOKEN, // Needed for certain operations like updating content or accessing previewDrafts perspective
});

export const getSystemVariables = async () => {
  const data = await client.fetch('*[_type == "systemVariables"]');
  return data;
};
