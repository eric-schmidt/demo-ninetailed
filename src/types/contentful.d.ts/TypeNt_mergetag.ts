import type { Entry, EntryFields } from "contentful";

export interface TypeNt_mergetagFields {
    nt_name: EntryFields.Symbol;
    nt_fallback?: EntryFields.Symbol;
    nt_mergetag_id: EntryFields.Symbol;
}

export type TypeNt_mergetag = Entry<TypeNt_mergetagFields>;
