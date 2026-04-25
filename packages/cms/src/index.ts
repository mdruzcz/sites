import { createClient, type SanityClient } from "next-sanity";

/**
 * One Sanity project for all sites; each site has its own dataset.
 * Set NEXT_PUBLIC_SANITY_DATASET differently in each Vercel project.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = "2024-10-01";

export function getSanityClient(): SanityClient {
  if (!projectId || !dataset) {
    throw new Error(
      "[@sites/cms] NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET is not set."
    );
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production"
  });
}
