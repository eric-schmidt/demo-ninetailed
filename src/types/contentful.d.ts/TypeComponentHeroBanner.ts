import type { Asset, Entry, EntryFields } from "contentful";
import type { TypeNt_experienceFields } from "./TypeNt_experience";

export interface TypeComponentHeroBannerFields {
    internalName?: EntryFields.Symbol;
    headline?: EntryFields.Symbol;
    bodyText?: EntryFields.RichText;
    image?: Asset;
    nt_experiences?: Entry<TypeNt_experienceFields>[];
}

export type TypeComponentHeroBanner = Entry<TypeComponentHeroBannerFields>;
