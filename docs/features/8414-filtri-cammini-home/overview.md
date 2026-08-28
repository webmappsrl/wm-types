> Ticket: oc:8414

# Filtri sui cammini in Home — tipi condivisi

## Cosa cambia
Vengono aggiunti a `src/config.ts` i tipi condivisi necessari a rappresentare le caratteristiche filtrabili di un cammino (`LayerAttributes`), esposte dal backend (oc:8180) in `MAP.layers[i].attributes`: forma del percorso, portata della rete escursionistica, stagioni consigliate, e i valori localizzati di regioni/temi. Segue lo stesso pattern già stabilito per `ConfigDetailBox` (oc:8181): tipi senza prefisso `I`, testi localizzati via `Partial<Record<Language, string>>`, enum come union di literal (stesso stile di `LANGUAGES`/`Language` in `src/language.ts`).

## Perché
Il nuovo componente filtri in Home (wm-core, oc:8414) deve tipizzare i dati di `MAP.layers[*].attributes` senza duplicare le definizioni né dipendere da tipi `any`. `wm-types` è il livello base della catena di dipendenze (`wm-types` → `wm-core` → `wm-webapp`), quindi è la sede corretta per un contratto dati condiviso.

## Requisiti
- [ ] `ROUTE_SHAPES`/`RouteShape` — union `'roundtrip' | 'linear' | 'discontinuous'`
- [ ] `WALKING_NETWORKS`/`WalkingNetwork` — union `'lwn' | 'rwn' | 'nwn' | 'iwn'`
- [ ] `SEASONS`/`Season` — union `'spring' | 'summer' | 'autumn' | 'winter'`
- [ ] `LayerAttributeValue<T>` — `{value: T; name: Partial<Record<Language, string>>}`
- [ ] `LayerAttributes` — interfaccia con tutti i campi **opzionali** (`distance?`, `stage_count?`, `shape?`, `taxonomy_where?`, `themes?`, `walking_network?`, `season?`): assenza di una chiave significa "dato non disponibile", non zero/vuoto
  - `distance`/`stage_count`: **numeri grezzi**, non wrappati in `LayerAttributeValue` (verificato contro payload reale del backend locale dopo il fix del blocco descritto in Rischi: `"distance": 393.52, "stage_count": 17`)
  - `shape`/`taxonomy_where`/`themes`/`walking_network`/`season`: wrappati in `LayerAttributeValue<T>` (verificato: `"shape": {"value": "linear", "name": {...}}`)
- [ ] Nessuna logica applicativa introdotta in questo repo (solo tipi, coerente con lo scope di `wm-types`)

## Rischi
- **Enum non ancora validati contro dati di produzione reali**: al momento della pianificazione, il backend oc:8180 non è deployato su `main` (vedi `notes.md` nel repo `wm-core` per il dettaglio) — nessun layer in produzione ha `attributes` popolato. Se il payload reale, una volta deployato, dovesse divergere dai valori enum documentati nel ticket (es. nuovi codici `shape`/`season` non previsti), i tipi vanno allineati in un secondo momento. Mitigato dal requisito esplicito (lato wm-core) di non fare `switch` esaustivi su questi enum senza ramo di default.

## Out of scope
- Nessuna modifica al backend (contratto chiuso, oc:8180 già implementato su branch separato).
- Nessuna logica di filtro o derivazione opzioni (vive interamente in `wm-core`).
- Nessuna validazione runtime del payload (es. zod/io-ts) — coerente con l'assenza di validazione runtime altrove nella codebase per i dati di `config.json`; rischio esplicitamente accettato in Fase: challenge.
- Refuso preesistente `LANGUAGES` (`'pr'`, probabile typo per `'pt'`/portoghese, in `src/language.ts`) **non corretto in questo ciclo** — bug preesistente ereditato da `LayerAttributeValue.name`, non introdotto da questa feature, fuori scope.
- Nessun tipo analogo introdotto in `map-core` (`src/types/model.ts`) — stesso debito già noto di `IMAP` divergente tra wm-core/map-core (oc:8190, documentato nel CLAUDE.md del repo principale), non affrontato qui.

## Moduli toccati
- `src/config.ts` — nuovi tipi `RouteShape`, `WalkingNetwork`, `Season`, `LayerAttributeValue`, `LayerAttributes`
