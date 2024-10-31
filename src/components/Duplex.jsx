"use client";

import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import Image from "next/image";
import { imageLoader } from "../lib/imageLoader";

export const Duplex = (entry) => {
  const { fields: sourceMappedFields } = useContentfulLiveUpdates(entry);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 p-6 mt-12">
      <div className="text-white flex flex-col justify-center">
        <h2 className="text-2xl mb-4">{sourceMappedFields.headline || ""}</h2>

        <div>
          {documentToReactComponents(sourceMappedFields.bodyText || "")}
        </div>
      </div>

      <Image
        loader={imageLoader}
        width={sourceMappedFields.image.fields.file.details.image.width}
        height={sourceMappedFields.image.fields.file.details.image.height}
        sizes="(min-width: 1280px) 416px, (min-width: 780px) calc(45.42vw - 156px), calc(100vw - 240px)"
        src={`https:${sourceMappedFields.image?.fields.file.url}` || ""}
        className={`order-first ${
          sourceMappedFields.containerLayout
            ? "md:order-first"
            : "md:order-last"
        }`}
        alt={sourceMappedFields.image?.fields.title}
      />
    </section>
  );
};

export default Duplex;
