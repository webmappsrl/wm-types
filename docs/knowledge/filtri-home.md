# Tipi dei filtri sui cammini in Home

## Come funziona oggi

In `src/config.ts` vivono il vocabolario condiviso col backend — `ROUTE_SHAPES`/`RouteShape`, `WALKING_NETWORKS`/`WalkingNetwork`, `SEASONS`/`Season` — e i tipi della struttura filtro: `LayerAttributeValue<T>`, `LayerAttributes`, `FilterOption`, `NumericBucket`, `RouteFilterState`, `RouteFilterKey`. Li consuma `wm-core` per `ILAYER.attributes` e per il componente dei filtri Home.

## Perché così

- **I tipi sono stati spostati qui da `wm-core`** (oc:8414), dove erano nati in `home-route-filters.utils.ts`: richiesta esplicita del developer in review, stesso principio già applicato a `ConfigDetailBox` — i tipi condivisi vivono in `wm-types`, i consumer li consumano.
- **Gli enum sono verificati contro il backend** (oc:8414): valori e ordine confrontati con gli enum PHP reali, nessuna discrepanza. Le traduzioni non sono mai hardcoded qui né altrove: arrivano a runtime nel payload di ogni layer, in `LayerAttributeValue.name`.

## Cosa NON sta qui, e perché

`STAGE_COUNT_BUCKETS` e `DISTANCE_BUCKETS` — le soglie fisse dei bucket numerici — restano in `wm-core` (`constants/route-filters.ts`). Sono costanti solo-frontend, non un vocabolario condiviso col backend come `RouteShape`/`WalkingNetwork`/`Season`: **non appartengono a `wm-types` per definizione**. È un confine che si è già provato a spostare una volta.
