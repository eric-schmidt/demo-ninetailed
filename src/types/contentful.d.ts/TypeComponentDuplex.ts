import type { Asset, Entry, EntryFields } from "contentful";
import type { TypeNt_experienceFields } from "./TypeNt_experience";

export interface TypeComponentDuplexFields {
    internalName?: EntryFields.Symbol;
    containerLayout?: EntryFields.Boolean;
    headline?: EntryFields.Symbol;
    bodyText?: EntryFields.RichText;
    image?: Asset;
    nt_experiences?: Entry<TypeNt_experienceFields>[];
}

export type TypeComponentDuplex = Entry<TypeComponentDuplexFields>;
