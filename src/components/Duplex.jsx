"use client";

import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import Image from "next/image";
import { imageLoader } from "../lib/imageLoader";

export const Duplex = (entry) => {
  const { fields: liveUpdateFields } = useContentfulLiveUpdates(entry);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 p-6 mt-12">
      <div className="text-white flex flex-col justify-center">
        <h2 className="text-2xl mb-4">{liveUpdateFields.headline || ""}</h2>

        <div>{documentToReactComponents(liveUpdateFields.bodyText || "")}</div>
      </div>

      <Image
        loader={imageLoader}
        width={liveUpdateFields.image.fields.file.details.image.width}
        height={liveUpdateFields.image.fields.file.details.image.height}
        sizes="(min-width: 1280px) 416px, (min-width: 780px) calc(45.42vw - 156px), calc(100vw - 240px)"
        src={`https:${liveUpdateFields.image?.fields.file.url}` || ""}
        className={`order-first ${
          liveUpdateFields.containerLayout ? "md:order-first" : "md:order-last"
        }`}
        alt={liveUpdateFields.image?.fields.title}
      />
    </section>
  );
};

export default Duplex;
