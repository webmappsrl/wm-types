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
| GeolocationMode + mode in WmPosthogProps | oc:8127 | `src/user-activity.ts`, `src/posthog.ts` | Tipo `GeolocationMode` condiviso tra GeolocationService e WmPosthogProps |
| Redirect maps.valdicecinaoutdoor.it | oc:8039 | `src/environment.ts` | appId 64, shard geohub |
| Distanza rimanente e posizione nel profilo altimetrico | oc:8177 | `src/config.ts` | Nuovo campo opzionale `OPTIONS.showTrackRemainingDistance?: boolean`, gate del componente `wm-track-remaining-distance` in wm-core |
| Condivisione percorso registrato sui social | oc:8183 | `src/config.ts` | Nuovo campo opzionale `OPTIONS.ugcTrackShareEnabled?: boolean`, gate del pulsante "Condividi" in `ugc-track-properties` (wm-core) |
| Salva cammino nei preferiti | oc:8176 | `src/config.ts` | Nuovo campo opzionale `OPTIONS.showFavorites?: boolean`, gate del cuoricino preferiti su layer (wm-core) — chiave camelCase, non `show_favorites` |
| Box informativi configurabili (`config_detail`) | oc:8181 | `src/config.ts` | Tipi condivisi `ConfigDetailBox` / `ConfigDetailInfoBox` / `ConfigDetailInfoBoxItem` (senza prefisso `I`); `title`/`content` come `Partial<Record<Language, string>>`. Consumati da `wm-config-detail` in wm-core |
| Tracciamento bacino di utenza per cammino — user_id in WmPosthogProps | oc:8159 | `src/posthog.ts` | Nuovo campo opzionale `WmPosthogProps.user_id?: number`, popolato da `PosthogContextService` (wm-core) con `IUser.id` quando l'utente è loggato, omesso per utenti anonimi |

## Decisioni architetturali

### Box informativi configurabili (`config_detail`, oc:8181)
- Tipi spostati da wm-core a wm-types (fonte di verità condivisa); naming senza prefisso `I`, coerente con `APP`/`OPTIONS`/…
- Namespace `box_type` distinto da `config_home`/IBOX in wm-core — non unire le due union anche se in futuro comparisse una stringa uguale
- Localizzazione di `title`/`content` via `Partial<Record<Language, string>>` (stesso pattern di `elastic.ts`), non `iLocalString` di wm-core

### Tracciamento bacino di utenza per cammino — user_id in WmPosthogProps (oc:8159)
- `user_id: number`, non stringa — a differenza degli altri id di contesto dello stesso file (`layer_id`, `track_id`, ecc., stringificati lato wm-core), scelta deliberata per restare coerente con `IUser.id: number` (wm-core, `auth.model.ts`) senza introdurre coercizioni; verificato nessun mismatch col consumer in review
- Nessuna logica applicativa in questo repo: la popolazione effettiva del campo (selettore `auth.user`, gating su utente loggato, TODO `identify()`) vive interamente in `wm-core` — vedi CLAUDE.md di quel repo

### Condivisione percorso registrato sui social (oc:8183)
- Modifica minima come da piano: solo `OPTIONS.ugcTrackShareEnabled?: boolean` aggiunto in ordine alfabetico in `src/config.ts`, nessuna decisione di design autonoma — dettagli su gating e stato UI in `wm-core/docs/features/8183-condivisione-percorso-registrato-sui-social/notes.md`
- Nessun default client-side impostato altrove per questo campo: resta `undefined` finché un backend non lo valorizza esplicitamente via `config.json`

### Distanza rimanente e posizione nel profilo altimetrico (oc:8177)
- `OPTIONS.showTrackRemainingDistance?: boolean` è opzionale (non tutti i backend `config.json` lo espongono) — il default client-side vive in `wm-core/store/conf/conf.reducer.ts`, non qui
- Il flag copre solo il componente `wm-track-remaining-distance` in wm-core (card "distanza rimanente"), non il marker di posizione né l'aggiornamento della barra "Pendenza" sul grafico altimetrico, che restano sempre attivi indipendentemente dal valore — scelta esplicita del developer, dettagli in `wm-core/docs/features/8177-distanza-rimanente-posizione-profilo-altimetrico/notes.md`

### Redirect maps.valdicecinaoutdoor.it (oc:8039)
- La modifica riguarda solo `redirects` in `src/environment.ts` — virtualhost e deploy sono task separati.
- Il matching usa `hostname.includes()`: subdomain come `www.maps.valdicecinaoutdoor.it` matchano automaticamente (non è un problema se il DNS per `www.` non è configurato).
- Il redirect deve essere deployato prima che il virtualhost punti alla nuova webapp: in caso contrario l'app riceve `NaN` come `appId`.
