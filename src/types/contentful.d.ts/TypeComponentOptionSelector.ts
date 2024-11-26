import type { Entry, EntryFields } from "contentful";

export interface TypeComponentOptionSelectorFields {
    internalName: EntryFields.Symbol;
    headline: EntryFields.Symbol;
    trait: EntryFields.Symbol;
    options: EntryFields.Object;
}

export type TypeComponentOptionSelector = Entry<TypeComponentOptionSelectorFields>;
