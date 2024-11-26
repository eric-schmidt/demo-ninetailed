import type { Entry, EntryFields } from "contentful";

export interface TypeNt_audienceFields {
  nt_name: EntryFields.Symbol;
  nt_description?: EntryFields.Text;
  nt_rules: EntryFields.Object;
  nt_audience_id: EntryFields.Symbol;
  nt_metadata?: EntryFields.Object;
}

export type TypeNt_audience = Entry<TypeNt_audienceFields>;
