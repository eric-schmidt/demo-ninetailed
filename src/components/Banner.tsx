"use client";

import React from "react";
import { Block, Inline, BLOCKS, INLINES } from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { MergeTag } from "@ninetailed/experience.js-react";
import type {
  TypeComponentBanner,
  TypeComponentBannerFields,
} from "@/types/contentful.d.ts/TypeComponentBanner";

export const Banner: React.FC<TypeComponentBanner> = (entry) => {
  const { content } = entry.fields as TypeComponentBannerFields;

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: Block, children: React.ReactNode) => (
        <p className="text-xl">{children}</p>
      ),
      [INLINES.EMBEDDED_ENTRY]: (node: Inline) => {
        if (node.data.target.sys.contentType.sys.id !== "nt_mergetag") {
          return null;
        }

        const { nt_mergetag_id, nt_fallback } = node.data.target.fields;

        return (
          <span className="text-rose-500 font-bold">
            <MergeTag id={nt_mergetag_id} fallback={nt_fallback} />
          </span>
        );
      },
    },
  };

  return (
    <div className="absolute top-0 left-0 w-full p-8 bg-gray-900 text-center">
      {documentToReactComponents(content, options as Options)}
    </div>
  );
};

export default Banner;
