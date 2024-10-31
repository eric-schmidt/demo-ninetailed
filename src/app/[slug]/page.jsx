import React from "react";
import { draftMode } from "next/headers";
import { getEntriesBySlug } from "@/src/lib/client";
import { ComponentResolver } from "@/src/components/ComponentResolver";
import { notFound } from "next/navigation";

const LandingPage = async ({ params }) => {
  // Check if Draft Mode is enabled.
  let { isEnabled } = draftMode();
  // TODO: Can't set the cookie on localhost with Live Preview, so preview can be forced to `true` here.
  // isEnabled = true;

  const landingPages = await getEntriesBySlug({
    preview: isEnabled,
    contentType: "page",
    slug: params.slug,
    includeDepth: 10,
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
