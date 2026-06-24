# CLAUDE.md — wm-types

## Stack

- Tipi TypeScript condivisi tra `wm-core`, `map-core` e `wm-webapp`
- Nessuna logica applicativa — solo interfacce, tipi e costanti

## Architettura

`wm-types` è il livello base della catena di dipendenze: `wm-types` → `wm-core` → `wm-webapp`.

Il file principale è `src/environment.ts`, che contiene:
- Tipo `Environment` e interfacce correlate (`Shard`, `Redirect`, `ShardName`)
- Costante `shards` — mappa dei backend per ogni shard (geohub, maphub, osm2cai, ecc.)
- Costante `redirects` — mappa domini custom → `{shardName, appId}`

### Meccanismo redirects

Quando la webapp viene caricata da un dominio presente in `redirects`, usa automaticamente l'`appId` e lo `shardName` specificati anziché quelli di default. Il matching avviene tramite `hostname.includes(key)` (sottostringa).

**Per aggiungere un nuovo dominio custom:** aggiungere una entry all'oggetto `redirects` in `src/environment.ts`, poi allineare il submodule in `wm-webapp`.

## Feature disponibili

| Feature | Ticket | Moduli toccati | Note |
|---|---|---|---|
| Campo `mode` in WmPosthogProps | oc:8127 | `src/posthog.ts` | Usato dal heartbeat `userOnline` in wm-core |
| Redirect maps.valdicecinaoutdoor.it | oc:8039 | `src/environment.ts` | appId 64, shard geohub |

## Decisioni architetturali

### Redirect maps.valdicecinaoutdoor.it (oc:8039)
- La modifica riguarda solo `redirects` in `src/environment.ts` — virtualhost e deploy sono task separati.
- Il matching usa `hostname.includes()`: subdomain come `www.maps.valdicecinaoutdoor.it` matchano automaticamente (non è un problema se il DNS per `www.` non è configurato).
- Il redirect deve essere deployato prima che il virtualhost punti alla nuova webapp: in caso contrario l'app riceve `NaN` come `appId`.
