"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useNinetailed } from "@ninetailed/experience.js-react";

const TrackPageInner = () => {
  const pathname = usePathname();
  const { identify, page } = useNinetailed();
  const personalizationParams = ["preferredAnimal"];
  let searchParams = useSearchParams();
  searchParams = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    // For each searchParam that is also a personalizationParam,
    // log it as a trait to the Ninetailed profile.
    searchParams &&
      personalizationParams.forEach((param) => {
        if (searchParams[param]) {
          identify("", { [param]: searchParams[param] });
        }
      });
    // Additionally, log a page view to Ninetailed.
    page();
  }, [page, pathname]);

  return null;
};

const TrackPage = () => (
  // @see: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  <Suspense>
    <TrackPageInner />
  </Suspense>
);

export default TrackPage;
