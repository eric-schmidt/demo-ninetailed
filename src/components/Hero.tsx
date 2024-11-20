"use client";

import React from "react";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Image from "next/image";
import { imageLoader } from "@/lib/imageLoader";
import type {
  TypeComponentHeroBanner,
  TypeComponentHeroBannerFields,
} from "@/types/contentful.d.ts/TypeComponentHeroBanner";

export const Hero: React.FC<TypeComponentHeroBanner> = (entry) => {
  const { fields }: { fields: TypeComponentHeroBannerFields } =
    useContentfulLiveUpdates(entry);

  return (
    <section className="container relative">
      <div className="relative z-10 md:max-w-lg px-10 py-20 md:px-10 md:py-40">
        <h1 className="drop-shadow-lg mb-4">{fields.headline || ""}</h1>

        {fields.bodyText && (
          <div className="text-md lg:text-lg mb-4">
            {documentToReactComponents(fields.bodyText as Document)}
          </div>
        )}
      </div>

      <Image
        className="object-cover"
        loader={imageLoader}
        priority={true} // prevent Largest Contentful Paint issues
        fill={true} // add object fit w/o height/width requirement
        sizes="(min-width: 1280px) 1024px, (min-width: 780px) calc(90.83vw - 121px), calc(100vw - 96px)"
        src={`https:${fields.image?.fields?.file?.url}` || ""}
        alt={fields.image?.fields.title || ""}
      />
    </section>
  );
};

export default Hero;
