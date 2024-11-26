"use client";

import React from "react";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { useNinetailed } from "@ninetailed/experience.js-react";

export const CTA = (entry) => {
  const { fields } = useContentfulLiveUpdates(entry);
  const { track } = useNinetailed();

  const handleClick = async () => {
    // Log this click as an event for Ninetailed metric tracking.
    await track(fields.event);
  };

  return (
    fields.linkText &&
    fields.linkDestination && (
      <a
        className="inline-block font-bold mt-8 py-2 px-4 bg-blue-700 text-white rounded cursor-pointer"
        href={fields.linkDestination}
        onClick={handleClick}
      >
        {fields.linkText}
      </a>
    )
  );
};

export default CTA;
