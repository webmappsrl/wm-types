import {Language} from './language';

// Una voce di tassonomia (attività, luogo, tipo di percorso, …). Tipo chiuso: nessuna index signature.
export interface TaxonomyItem {
  identifier: string;
  name: Partial<Record<Language, string>>;
  icon_name?: string | null;
  admin_level?: number;
}

// Le tassonomie di una traccia, raggruppate per tipo.
export interface Taxonomies {
  activity?: TaxonomyItem[];
  where?: TaxonomyItem[];
  [type: string]: TaxonomyItem[] | undefined; // route-type, hiking-difficulty, …
}
