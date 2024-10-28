import { createClient } from "contentful";
import { unstable_cache } from "next/cache";
import safeJsonStringify from "safe-json-stringify";
import {
  AudienceMapper,
  ExperienceMapper,
} from "@ninetailed/experience.js-utils-contentful";

export const getEntryById = async ({ entryId }) => {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENV_ID}/entries/${entryId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_KEY}`,
      },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return await res.json();
};

export const getLinksToEntryById = async ({ entryId }) => {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENV_ID}/entries?links_to_entry=${entryId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_KEY}`,
      },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return await res.json();
};

export const getEntriesBySlug = async ({
  preview = false,
  contentType,
  slug,
  includeDepth = 10,
}) => {
  // Define a cached function so that we can revalidate when content is updated.
  const getCachedEntries = unstable_cache(
    async () => {
      // Determine whether to use the preview or delivery domain + API key.
      const domain = preview ? "preview.contentful.com" : "cdn.contentful.com";
      const apiKey = preview
        ? process.env.CONTENTFUL_PREVIEW_KEY
        : process.env.CONTENTFUL_DELIVERY_KEY;

      const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: apiKey,
        host: domain,
      });

      try {
        const response = await client.getEntries({
          content_type: contentType,
          include: includeDepth,
          "fields.slug": slug,
        });
        // Prevent circular reference errors.
        return JSON.parse(safeJsonStringify(response.items));
      } catch (error) {
        console.error("Error fetching entries from Contentful:", error);
        throw error;
      }
    },
    [`entries-${contentType}-${slug}`],
    { tags: [slug] }
  );

  try {
    const cachedData = await getCachedEntries();
    return cachedData;
  } catch (error) {
    console.error("Error retrieving cached entries:", error);
    throw error;
  }
};

export const getEntriesByType = async ({
  preview = false,
  contentType,
  includeDepth = 10,
}) => {
  // Determine whether to use the preview or delivery domain + API key.
  const domain = preview ? "preview.contentful.com" : "cdn.contentful.com";
  const apiKey = preview
    ? process.env.CONTENTFUL_PREVIEW_KEY
    : process.env.CONTENTFUL_DELIVERY_KEY;

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: apiKey,
    host: domain,
  });

  try {
    const response = await client.getEntries({
      content_type: contentType,
      include: includeDepth,
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching entries from Contentful:", error);
    throw error;
  }
};

export const getAllMappedAudiences = async () => {
  const entries = await getEntriesByType({
    preview: true,
    contentType: "nt_audience",
    includeDepth: 10,
  });
  return entries
    .filter(AudienceMapper.isAudienceEntry)
    .map(AudienceMapper.mapAudience);
};

export const getAllMappedExperiences = async () => {
  const entries = await getEntriesByType({
    preview: true,
    contentType: "nt_experience",
    includeDepth: 10,
  });
  return entries
    .filter(ExperienceMapper.isExperienceEntry)
    .map(ExperienceMapper.mapExperience);
};
