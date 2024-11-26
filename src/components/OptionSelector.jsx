"use client";

import React, { useState } from "react";
import { useNinetailed, useProfile } from "@ninetailed/experience.js-react";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

const OptionSelector = (entry) => {
  // @see https://docs.ninetailed.io/for-developers/experience-sdk/sending-events
  const { track, identify } = useNinetailed();
  const [selectedOption, setSelectedOption] = useState(null);
  const { fields: liveUpdateFields } = useContentfulLiveUpdates(entry);

  const handleSelectOption = (option) => {
    // Remove any non-printable characters (added by Live Preview Content Source Maps)
    // from the trait key, as this will disrupt the key we use to add the trait to the profile.
    const cleanKey = liveUpdateFields.trait.replace(/[^\P{C}\t\n\r]+/gu, "");

    setSelectedOption(option);
    // Update Ninetailed profile trait with selected option.
    identify("", { [cleanKey]: option });
  };

  return (
    <div className="w-full mt-16 p-16 text-center border-2 rounded bg-gray-900">
      <h2 className="text-xl">{liveUpdateFields.headline || ""}</h2>
      <div className="mt-8">
        {liveUpdateFields.options.map((option) => (
          <React.Fragment key={option.key}>
            <input
              type="radio"
              id={option.key}
              name={liveUpdateFields.internalName}
              value={option.value}
              checked={selectedOption === option.key}
              onChange={() => handleSelectOption(option.key)}
              hidden
            />
            <label
              htmlFor={option.key}
              className={`font-bold m-2 py-2 px-4 rounded cursor-pointer ${
                selectedOption === option.key
                  ? "bg-blue-700 text-white"
                  : "bg-gray-800 text-gray-500"
              }`}
            >
              {option.value}
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OptionSelector;
