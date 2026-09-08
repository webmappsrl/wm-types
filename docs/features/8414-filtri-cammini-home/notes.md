> Ticket: oc:8414

# Notes — Filtri sui cammini in Home — tipi condivisi

## Deviazioni dal piano

- **Tipi aggiuntivi non previsti nel piano originale**: `FilterOption`, `NumericBucket`, `RouteFilterState`, `RouteFilterKey` sono stati spostati qui da `wm-core` (dove erano stati scritti inizialmente in `home-route-filters.utils.ts`), su richiesta esplicita del developer dopo la review del codice: "per quanto riguarda tipi ed interfacce c'è il repository wm-types apposta". Coerente col pattern già stabilito per `ConfigDetailBox`/`LayerAttributes` (oc:8181/oc:8180): i tipi condivisi vivono qui, `wm-core` li consuma.

## Decisioni

- **`STAGE_COUNT_BUCKETS`/`DISTANCE_BUCKETS` (le soglie fisse dei bucket numerici) NON sono state spostate qui**, restano in `wm-core/projects/wm-core/src/constants/route-filters.ts`: sono costanti solo-frontend (non un vocabolario condiviso col backend, a differenza di `RouteShape`/`WalkingNetwork`/`Season`), quindi non appartengono a wm-types per definizione (`wm-types` = "nessuna logica applicativa — solo interfacce, tipi e costanti *condivise*"). `wm-core` ha già una directory `constants/` dedicata proprio a questo genere di costanti (es. `track-remaining-distance.ts`, oc:8177) — stesso pattern riusato.
- **Valori e ordine di `ROUTE_SHAPES`/`WALKING_NETWORKS`/`SEASONS` verificati contro gli enum PHP reali del backend** (`App\Enums\RouteShape`, `Wm\WmPackage\Enums\Season`, `Wm\WmPackage\Enums\OsmWalkingNetwork`, branch `RDO_ass_cammini_italia_2026_2`): identici, nessuna correzione necessaria. Le traduzioni non sono hardcoded lato backend (Laravel `__()`), arrivano sempre runtime nel payload di ogni layer — confermato che il frontend non deve mai hardcodare le traduzioni dei CODICI valore (`RouteShape`/`WalkingNetwork`/`Season`), solo eventualmente delle ETICHETTE UI statiche proprie (vedi notes.md di wm-core per la scelta fatta su Stagioni/Portata, che invece hardcoda le traduzioni delle 8 etichette nel sistema i18n esistente — scelta interna a wm-core, non a questo repo).

## Follow-up

Nessuno.
