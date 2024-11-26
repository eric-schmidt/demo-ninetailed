"use client";

import React from "react";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ComponentResolver } from "@/src/components/ComponentResolver";

export const CTABlock = (entry) => {
  const { fields } = useContentfulLiveUpdates(entry);

  return (
    <div className="w-full mt-16 p-16 text-center border-2 rounded bg-gray-900">
      {fields.headline && <h2 className="text-xl">{fields.headline}</h2>}
      {fields.copy && <p className="mt-8 text-sm">{fields.copy}</p>}
      {fields.link && <ComponentResolver entry={fields.link} />}
    </div>
  );
};

export default CTABlock;
