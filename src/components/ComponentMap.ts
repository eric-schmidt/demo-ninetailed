// Provide mapping based on name in Contentful and point to JSX code responsible for rendering the content.
import dynamic from "next/dynamic";

// TODO: Add additional mapping for more component types.
export const ComponentMap = {
  componentBanner: dynamic(() => import("@/components/Banner")),
  componentCTA: dynamic(() => import("@/components/CTA")),
  componentCTABlock: dynamic(() => import("@/components/CTABlock")),
  componentDuplex: dynamic(() => import("@/components/Duplex")),
  componentHeroBanner: dynamic(() => import("@/components/Hero")),
  componentOptionSelector: dynamic(() => import("@/components/OptionSelector")),
};
