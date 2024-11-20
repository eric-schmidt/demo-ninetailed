"use client";

import chalk from "chalk";
import React from "react";
import { Entry } from "contentful";
import { Experience } from "@ninetailed/experience.js-react";
import { ExperienceMapper } from "@ninetailed/experience.js-utils-contentful";
import { ComponentMap } from "@/components/ComponentMap";

export const ComponentResolver: React.FC<{ entry: Entry }> = ({ entry }) => {
  const Component = ComponentMap[entry.sys.contentType.sys.id];

  // If there is no component in the mappings, return message.
  if (!Component) {
    console.log(chalk.red(`No Mapping for: ${entry.sys.contentType.sys.id}`));
    return;
  }

  // Get mapped Ninetailed Experiences from the entry.
  const experiences = (entry.fields.nt_experiences || [])
    .filter(ExperienceMapper.isExperienceEntry)
    .map(ExperienceMapper.mapExperience);

  return (
    // @see https://docs.ninetailed.io/for-developers/experience-sdk/rendering-experiences
    <Experience
      id={entry.sys.id}
      component={Component}
      {...entry}
      experiences={experiences}
      // TODO: Figure out why this isn't working and instead stays in a loading state.
      // Could this be related to why we don't see personalized content showing up?
      loadingComponent={() => <div>Loading...</div>}
    />
  );
};
