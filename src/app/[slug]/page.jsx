import React from "react";
import { draftMode } from "next/headers";
import { getEntriesBySlug } from "@/src/lib/client";
import { ComponentResolver } from "@/src/components/ComponentResolver";
import { notFound } from "next/navigation";
import { parseTimelinePreviewToken } from "@contentful/timeline-preview";

const LandingPage = async ({ params, searchParams }) => {
  // Check if Draft Mode is enabled.
  let { isEnabled } = draftMode();
  // TODO: Can't set the cookie on localhost with Live Preview, so preview can be forced to `true` here.
  // isEnabled = true;

  const timelineToken = searchParams?.timeline;
  const { releaseId, timestamp } = timelineToken
    ? parseTimelinePreviewToken(timelineToken)
    : {};

  const landingPages = await getEntriesBySlug({
    preview: isEnabled || !!releaseId || !!timestamp,
    contentType: "page",
    slug: params.slug,
    includeDepth: 10,
    releaseId,
    timestamp,
  });

  if (landingPages.length === 0) {
    notFound();
  }

  return (
    <>
      {landingPages &&
        landingPages.map((landingPage) =>
          landingPage.fields.content?.map((entry) => (
            <ComponentResolver key={entry.sys.id} entry={entry} />
          ))
        )}
    </>
  );
};

export default LandingPage;
