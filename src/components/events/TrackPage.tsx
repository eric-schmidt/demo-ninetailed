"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useNinetailed } from "@ninetailed/experience.js-react";

export const TrackPage = () => {
  const pathname = usePathname();
  const { identify, page } = useNinetailed();
  const personalizationParams = useMemo(() => ["preferredAnimal"], []);

  useEffect(() => {
    // For each searchParam that is also a personalizationParam,
    // log it as a trait to the Ninetailed profile.
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const searchParamsObj: { [key: string]: string } = Object.fromEntries(
      searchParams.entries()
    );

    searchParamsObj &&
      personalizationParams.forEach((param) => {
        if (searchParamsObj[param]) {
          identify("", { [param]: searchParamsObj[param] });
        }
      });
    // Additionally, log a page view to Ninetailed.
    page();
  }, [identify, page, pathname, personalizationParams]);

  return null;
};
