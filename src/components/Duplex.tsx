"use client";

import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import type { AssetFields } from "contentful";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import Image from "next/image";
import { imageLoader } from "../lib/imageLoader";
import type {
  TypeComponentDuplex,
  TypeComponentDuplexFields,
} from "@/types/contentful.d.ts/TypeComponentDuplex";

export const Duplex: React.FC<TypeComponentDuplex> = (entry) => {
  const { fields }: { fields: TypeComponentDuplexFields } =
    useContentfulLiveUpdates(entry);
  const imageFields = fields?.image?.fields as AssetFields;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 p-6 mt-12">
      <div className="text-white flex flex-col justify-center">
        {fields.headline && (
          <h2 className="text-2xl mb-4">{fields.headline}</h2>
        )}

        {fields.bodyText && (
          <div>{documentToReactComponents(fields.bodyText as Document)}</div>
        )}
      </div>

      {imageFields && (
        <Image
          loader={imageLoader}
          width={imageFields?.file?.details?.image?.width}
          height={imageFields?.file?.details?.image?.height}
          sizes="(min-width: 1280px) 416px, (min-width: 780px) calc(45.42vw - 156px), calc(100vw - 240px)"
          src={`https:${imageFields?.file?.url}`}
          className={`order-first ${
            fields.containerLayout ? "md:order-first" : "md:order-last"
          }`}
          alt={imageFields?.title ?? ""}
        />
      )}
    </section>
  );
};

export default Duplex;
