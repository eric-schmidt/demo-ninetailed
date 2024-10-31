"use client";

import React from "react";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
// @ninetailed/experience.js-next only works with Pages router, so we use the React version instead.
import { NinetailedProvider } from "@ninetailed/experience.js-react";
import { NinetailedPreviewPlugin } from "@ninetailed/experience.js-plugin-preview";
import { NinetailedInsightsPlugin } from "@ninetailed/experience.js-plugin-insights";

export const Providers = ({
  children,
  draftModeEnabled,
  audiences,
  experiences,
}) => {
  console.log("DRAFT ENABLED?", draftModeEnabled);

  return (
    <NinetailedProvider
      clientId={process.env.NEXT_PUBLIC_NINETAILED_API_KEY}
      environment={process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT_ID}
      plugins={[
        new NinetailedInsightsPlugin(),
        ...(draftModeEnabled
          ? [
              new NinetailedPreviewPlugin({
                audiences: audiences,
                experiences: experiences,
                ui: { opener: { hide: false } },
                // Optional: Callback to handle user forwarding to the experience entry in your CMS
                onOpenExperienceEditor: (experience) => {
                  window.open(
                    `https://app.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}/entries/${experience.id}`,
                    "_blank"
                  );
                },
                // Optional: Callback to handle user forwarding to the audience entry in your CMS
                onOpenAudienceEditor: (audience) => {
                  window.open(
                    `https://app.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}/entries/${audience.id}`,
                    "_blank"
                  );
                },
                // Optional: Determine the visibility of the Preview Plugin
              }),
            ]
          : []),
      ]}
    >
      <ContentfulLivePreviewProvider
        locale="en-US"
        enableInspectorMode={true || draftModeEnabled}
        enableLiveUpdates={true || draftModeEnabled}
        // debugMode={true}
      >
        {children}
      </ContentfulLivePreviewProvider>
    </NinetailedProvider>
  );
};
