# wm-types — CLAUDE.md

## Cos'è questo repo

Tipi TypeScript condivisi: interfacce, tipi e costanti, senza alcuna logica applicativa. È il
livello base della catena di dipendenze e non dipende da nessuno.

È un **submodule Git** con quattro consumer: i due prodotti — `webmapp-app` (sotto
`core/src/app/shared/wm-types`) e `wm-webapp` (sotto `src/app/shared/wm-types`) — e i due
submodule che stanno loro accanto, `wm-core` e `map-core`, che lo importano come `@wm-types/…`.

L'unica dipendenza è TypeScript: non ci sono dipendenze applicative, e l'unico script è la build.

## Regole del repo

- **Nessuna logica applicativa: solo interfacce, tipi e costanti.** Se serve un default, un
  selettore o una funzione, il posto è il consumer — anche quando aggiungerlo qui sarebbe più
  comodo. È la ragione per cui questo repo esiste.
- **Un tipo esportato si rimuove solo dopo che tutti i consumer hanno smesso di importarlo.** Un
  bump del submodule fatto prima rompe la build TypeScript di chi sincronizza in quell'ordine, e i
  consumer sono quattro. La guardia è un `grep` sull'intero albero sorgente prima di togliere la
  riga.
- **Una modifica qui arriva a tutti e quattro.** Non esiste una modifica «solo per un prodotto».

## Comandi

| Cosa | Comando |
|---|---|
| Compilare (type-check) | `npm run build` (`tsc`) |
| Test | **nessuno**: `package.json` non configura né test né lint. I tipi si verificano compilando, e il comportamento si prova nei consumer |

## Convenzioni

- **Gli ID dei ticket hanno la forma `oc:<numero>`** e vengono da Orchestrator. Ogni documento
  sotto `docs/features/` inizia con `> Ticket: oc:<ID>`, e lo slug della cartella è
  `<ID>-<titolo-in-kebab-case>`. Lo scope dei commit porta il ticket: `feat(oc:<ID>): …`.
- **I tipi non hanno il prefisso `I`**: si chiamano `APP`, `OPTIONS`, `ConfigDetailBox`. La vecchia
  convenzione è in via di abbandono e non va reintrodotta.
- **La localizzazione di un campo si scrive `Partial<Record<Language, string>>`**, non con tipi che
  vivono in un consumer.
- **`docs/` ha tre destinazioni**: `features/` è il cantiere di un lavoro (com'è andato,
  immutabile), `knowledge/` la conoscenza per argomento (perché funziona così), `howto/` le
  procedure. Le trappole non stanno in nessuna delle tre: stanno in `.claude/rules/`.
- **Documentazione, commenti e messaggi di commit sono in italiano**, i termini tecnici in inglese.

## Architettura

Il file principale è `src/environment.ts`, che contiene il tipo `Environment` e le interfacce
correlate (`Shard`, `Redirect`, `ShardName`), la costante `shards` — la mappa dei backend per ogni
shard (geohub, maphub, osm2cai…) — e la costante `redirects`, che mappa i domini custom su
`{shardName, appId}`.

Caricando la webapp da un dominio presente in `redirects`, l'app usa l'`appId` e lo `shardName`
dichiarati lì invece dei default. Per aggiungerne uno:
[docs/howto/aggiungere-un-redirect.md](docs/howto/aggiungere-un-redirect.md).

## Conoscenza

| Argomento | Cosa copre | Ticket | Pagina |
|---|---|---|---|
| Box informativi (`config_detail`) | Tipi dei box, localizzazione, il tipo rimosso in oc:8458 | oc:8181, oc:8427, oc:8458 | [docs/knowledge/config-detail.md](docs/knowledge/config-detail.md) |
| Filtri sui cammini in Home | Vocabolario condiviso col backend, e cosa resta invece in `wm-core` | oc:8414 | [docs/knowledge/filtri-home.md](docs/knowledge/filtri-home.md) |
| Flag opzionali di `OPTIONS` | I flag esposti dal `config.json`, con il rimando a chi li usa | oc:8176, oc:8177, oc:8183 | [docs/knowledge/opzioni-config-json.md](docs/knowledge/opzioni-config-json.md) |
| Props degli eventi PostHog | `user_id` e `GeolocationMode`, e perché la popolazione sta altrove | oc:8127, oc:8159 | [docs/knowledge/posthog-props.md](docs/knowledge/posthog-props.md) |

## Trappole

Stanno in `.claude/rules/tipi-condivisi.md`, che si carica quando si tocca `src/`: l'ordine di
rimozione di un tipo, le chiavi di `OPTIONS` in camelCase, il matching dei redirect per
sottostringa e l'ordine di deploy che altrimenti produce `appId = NaN`.

## Lavori senza una pagina dedicata

| Lavoro | Ticket | In breve |
|---|---|---|
| Redirect `maps.valdicecinaoutdoor.it` | oc:8039 | Una entry in `redirects` (appId 64, shard geohub). Il meccanismo sta in `## Architettura`, la procedura in `docs/howto/aggiungere-un-redirect.md`, le trappole nella rule. `docs/features/8039-aggiornare-web-app-maps-valdicecinaoutdoor-it/` |
| `address` in `WmProperties` | oc:8406 | Campo **derivato lato client**, non inviato dal backend: `derivePoiAddress()` in wm-core lo compone da `addr_complete`/`addr_locality`/`addr_street`. Nasceva insieme a un `address_link` unito da `+` per l'URL di Maps, rimosso nello stesso ticket: chi costruisce quel link usa `encodeURIComponent`, che trasforma i `+` in `%2B`. `docs/features/8406-unificare-componenti-dettaglio-ecpoi/` |
