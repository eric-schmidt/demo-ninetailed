"use client";

import React from "react";
import { ContentfulLivePreview } from "@contentful/live-preview";
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
}) => (
  <NinetailedProvider
    clientId={process.env.NEXT_PUBLIC_NINETAILED_API_KEY}
    environment={process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT_ID}
    plugins={[
      new NinetailedInsightsPlugin(),
      // Conditionally include the Preview Plugin only if Draft Mode is enabled.
      ...(draftModeEnabled
        ? [
            new NinetailedPreviewPlugin({
              audiences: audiences,
              experiences: experiences,
              ui: { opener: { hide: false } },
              // If we're in the context of Live Preview, open the experience/audience
              // in the Live Preview sidebar, otherwise open in a new window.
              onOpenExperienceEditor: (experience) => {
                ContentfulLivePreview.initialized
                  ? ContentfulLivePreview.openEntryInEditor({
                      fieldId: "nt_name",
                      entryId: experience.id,
                    })
                  : window.open(
                      `https://app.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENV_ID}/entries/${experience.id}`,
                      "_blank"
                    );
              },
              onOpenAudienceEditor: (audience) => {
                ContentfulLivePreview.initialized
                  ? ContentfulLivePreview.openEntryInEditor({
                      fieldId: "nt_name",
                      entryId: audience.id,
                    })
                  : window.open(
                      `https://app.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENV_ID}/entries/${audience.id}`,
                      "_blank"
                    );
              },
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
