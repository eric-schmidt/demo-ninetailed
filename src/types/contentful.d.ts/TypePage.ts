import type { Entry, EntryFields } from "contentful";
import type { TypeComponentDuplexFields } from "./TypeComponentDuplex";
import type { TypeComponentHeroBannerFields } from "./TypeComponentHeroBanner";
import type { TypeComponentOptionSelectorFields } from "./TypeComponentOptionSelector";

export interface TypePageFields {
    internalName?: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    content: Entry<TypeComponentDuplexFields | TypeComponentHeroBannerFields | TypeComponentOptionSelectorFields>[];
}

export type TypePage = Entry<TypePageFields>;
