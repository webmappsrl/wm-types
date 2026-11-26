> Ticket: oc:8998

# Tassonomie del dettaglio traccia in forma v1

Il lavoro vive in `wm-core`: l'overview completa è in
`wm-core/docs/features/8998-tassonomie-del-dettaglio-traccia-in-forma-v1/overview.md`. Qui c'è
solo la parte che tocca questo repo.

## Cosa cambia

- `Shard` in `src/environment.ts` ha un campo opzionale `trackVersion` (per ora solo `'v1'`):
  dice quale versione del file traccia `tracks/<id>.json` lo shard pubblica su wmfe. Senza
  dichiarazione vale il file senza versione. `forestasdev` dichiara `'v1'`.
- Un tipo **chiuso**, senza index signature, per `properties.taxonomies` e per il suo elemento:
  `identifier`, `name` (`Partial<Record<Language, string>>`), `icon_name?`, `admin_level?`
  (solo sui `where`).
  `WmProperties` dichiara `taxonomies` con questo tipo.

## Perché

La webapp è unica per tutti gli shard e il `config.json` dell'app non dice nulla sulla versione
dei file: l'unico posto che conosce gli shard prima di scaricare qualunque cosa è
`environment.ts`. Il tipo chiuso rende verificabile dal compilatore che i componenti del
dettaglio traccia leggano solo campi che v1 ha davvero.

## Requisiti

- [ ] `Shard.trackVersion?: 'v1'`, dichiarato su `forestasdev`
- [ ] Tipo chiuso per `taxonomies` e per il suo elemento, esportato
- [ ] `WmProperties.taxonomies` usa quel tipo; le chiavi vecchie (`taxonomy_where`) restano
      dichiarate finché le usano i POI, fuori dallo scope di questo ticket

## Rischi

- Un campo nuovo su `Shard` è opzionale: le entry esistenti compilano senza modifiche.

## Out of scope

- `Hit` di Elasticsearch (`src/elastic.ts`) e i tipi dei POI.

## Moduli toccati

- `src/environment.ts`
- un file nuovo per il tipo di `taxonomies`, esportato dall'indice del pacchetto
- `src/feature.ts` — `WmProperties.taxonomies`
