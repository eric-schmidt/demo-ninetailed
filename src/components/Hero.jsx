"use client";

import React from "react";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { imageLoader } from "@/src/lib/imageLoader";

export const Hero = (entry) => {
  const { fields: liveUpdateFields } = useContentfulLiveUpdates(entry);

  // TODO: How can we abstract this to make it more reusable from component to component? Mapping file of some sort?
  let headingFieldId, imageFieldId;
  switch (entry.sys.contentType.sys.id) {
    case "componentHeroBanner":
      headingFieldId = "headline";
      imageFieldId = "image";
      break;

    case "post":
      headingFieldId = "postName";
      imageFieldId = "featuredImage";
      break;
  }

  return (
    <section className="container relative">
      <div className="relative z-10 md:max-w-lg px-10 py-20 md:px-10 md:py-40">
        <h1 className="drop-shadow-lg mb-4">
          {liveUpdateFields[headingFieldId] || ""}
        </h1>

        {liveUpdateFields.bodyText && (
          <div className="text-md lg:text-lg mb-4">
            {documentToReactComponents(liveUpdateFields.bodyText || "")}
          </div>
        )}

        {liveUpdateFields.ctaText && (
          // TODO: Add <Link> element instead <a> tag.
          <a
            className="btn p-2 w-fit inline-block bg-black"
            href={liveUpdateFields.targetPage?.fields?.slug || "/"}
          >
            {liveUpdateFields.ctaText || ""}
          </a>
        )}
      </div>

      <Image
        className="object-cover"
        loader={imageLoader}
        priority={true} // prevent Largest Contentful Paint issues
        fill={true} // add object fit w/o height/width requirement
        sizes="(min-width: 1280px) 1024px, (min-width: 780px) calc(90.83vw - 121px), calc(100vw - 96px)"
        src={`https:${liveUpdateFields[imageFieldId]?.fields.file.url}` || ""}
        alt={liveUpdateFields[imageFieldId]?.fields.title}
      />
    </section>
  );
};

export default Hero;
