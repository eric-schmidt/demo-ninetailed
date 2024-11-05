"use client";

import React from "react";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MergeTag } from "@ninetailed/experience.js-react";

export const Banner = (entry) => {
  const { content } = entry.fields;

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="text-xl">{children}</p>
      ),
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        if (node.data.target.sys.contentType.sys.id !== "nt_mergetag") {
          return;
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
      {documentToReactComponents(content, options)}
    </div>
  );
};

export default Banner;
