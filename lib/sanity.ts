import { createClient } from "@sanity/client";

function mustGetEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export function getSanityClient() {
  return createClient({
    projectId: mustGetEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: mustGetEnv("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: mustGetEnv("NEXT_PUBLIC_SANITY_API_VERSION"),
    useCdn: true,
  });
}