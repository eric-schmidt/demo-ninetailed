// Provide mapping based on name in Contentful and point to JSX code responsible for rendering the content.
import dynamic from "next/dynamic";

// TODO: Add additional mapping for more component types.
export const ComponentMap = {
  componentBanner: dynamic(() => import("@/src/components/Banner")),
  componentCTA: dynamic(() => import("@/src/components/CTA")),
  componentCTABlock: dynamic(() => import("@/src/components/CTABlock")),
  componentDuplex: dynamic(() => import("@/src/components/Duplex")),
  componentHeroBanner: dynamic(() => import("@/src/components/Hero")),
  componentOptionSelector: dynamic(() =>
    import("@/src/components/OptionSelector")
  ),
};
