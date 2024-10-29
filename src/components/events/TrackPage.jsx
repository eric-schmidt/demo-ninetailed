"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useNinetailed } from "@ninetailed/experience.js-react";

export const TrackPage = () => {
  const pathname = usePathname();
  const { page } = useNinetailed();

  useEffect(() => {
    page();
  }, [page, pathname]);
};
