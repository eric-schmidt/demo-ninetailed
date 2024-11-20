import type { Entry, EntryFields } from "contentful";
import type { TypeNt_audienceFields } from "./TypeNt_audience";

export interface TypeNt_experienceFields {
    nt_name: EntryFields.Symbol;
    nt_description?: EntryFields.Text;
    nt_type: "nt_experiment" | "nt_personalization";
    nt_config: EntryFields.Object;
    nt_audience?: Entry<TypeNt_audienceFields>;
    nt_variants?: Entry<Record<string, any>>[];
    nt_experience_id?: EntryFields.Symbol;
    nt_metadata?: EntryFields.Object;
}

export type TypeNt_experience = Entry<TypeNt_experienceFields>;
