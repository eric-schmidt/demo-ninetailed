import type { Entry, EntryFields } from "contentful";
import type { TypePageFields } from "./TypePage";

export interface TypeNavItemFields {
    Title: EntryFields.Symbol;
    internalLink?: Entry<TypePageFields>;
    externalLink?: EntryFields.Symbol;
}

export type TypeNavItem = Entry<TypeNavItemFields>;
