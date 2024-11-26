import type { Entry, EntryFields } from "contentful";
import type { TypeComponentBannerFields } from "./TypeComponentBanner";
import type { TypeNavItemFields } from "./TypeNavItem";

export interface TypeSiteConfigFields {
    internalName: EntryFields.Symbol;
    persistentBanner?: Entry<TypeComponentBannerFields>;
    headerNavigation?: Entry<TypeNavItemFields>[];
    footerNavigation?: Entry<TypeNavItemFields>[];
}

export type TypeSiteConfig = Entry<TypeSiteConfigFields>;
