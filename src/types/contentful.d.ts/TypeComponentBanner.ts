import type { Entry, EntryFields } from "contentful";

export interface TypeComponentBannerFields {
    internalName: EntryFields.Symbol;
    content: EntryFields.RichText;
}

export type TypeComponentBanner = Entry<TypeComponentBannerFields>;
