"use client";

import React from "react";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
// @ninetailed/experience.js-next only works with Pages router, so we use the React version instead.
import { NinetailedProvider } from "@ninetailed/experience.js-react";
import { NinetailedPreviewPlugin } from "@ninetailed/experience.js-plugin-preview";

export const Providers = ({
  children,
  draftModeEnabled,
  audiences,
  experiences,
}) => (
  <NinetailedProvider
    clientId={process.env.NEXT_PUBLIC_NINETAILED_API_KEY}
    environment={process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT_ID}
    plugins={[
      new NinetailedPreviewPlugin({
        audiences: audiences,
        experiences: experiences,
        ui: { opener: { hide: false } },
        // TODO: Enable these handlers.
        // Optional: Callback to handle user forwarding to the experience entry in your CMS
        // onOpenExperienceEditor: (experience) => {},
        // Optional: Callback to handle user forwarding to the audience entry in your CMS
        // onOpenAudienceEditor: (experience) => {},
        // Optional: Determine the visibility of the Preview Plugin
      }),
    ]}
  >
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableInspectorMode={true || draftModeEnabled}
      enableLiveUpdates={true || draftModeEnabled}
    >
      {children}
    </ContentfulLivePreviewProvider>
  </NinetailedProvider>
);
