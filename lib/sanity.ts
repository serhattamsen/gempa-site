import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

if (!projectId) throw new Error("Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!dataset) throw new Error("Missing env: NEXT_PUBLIC_SANITY_DATASET");

// ✅ Senin app dosyaların { client } import ediyor
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// ✅ İstersen fonksiyon da kalsın
export function getSanityClient() {
  return client;
}