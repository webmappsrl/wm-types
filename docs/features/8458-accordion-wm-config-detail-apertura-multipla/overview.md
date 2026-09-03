> Ticket: oc:8458

# Accordion wm-config-detail: apertura multipla e rimozione scrollIntoView

## Cosa cambia

Rimozione del tipo `ConfigDetailToggleEvent` da `src/config.ts` (introdotto in oc:8427 come payload del `CustomEvent('configDetailSettled')`). Dopo questo ciclo l'evento non viene più dispacciato da `ConfigDetailComponent` (wm-core) né consumato da alcun repo — verificato via grep che gli unici due consumer (`wm-core/home.component.ts`, `webmapp-app/map-details.component.ts`) vengono rimossi nello stesso ciclo (vedi overview wm-core e webmapp-app).

## Perché

Dead code: nessun repo referenzia più questo tipo dopo la rimozione dell'evento che descriveva. Coerente con la policy di rimozione pulita già applicata in questo progetto (es. oc:8382, rimozione di `PoiPage` come dead code confermato) — decisione esplicita del developer in reverse-interaction ("elimina il tipo, best practice") invece di lasciarlo deprecato/inutilizzato.

## Requisiti

- [ ] Rimuovere l'interfaccia `ConfigDetailToggleEvent` (e il relativo commento JSDoc) da `src/config.ts`.

## Rischi

- Se in futuro riemergesse la necessità di un evento di toggle per `wm-config-detail`, andrà ricreato da zero con la forma giusta per quel nuovo caso d'uso — rischio accettato esplicitamente, non una perdita di lavoro riutilizzabile (il tipo era una singola interfaccia di 2 campi).
- **Vincolo d'ordine nel commit/merge cross-repo** (emerso in Fase: challenge): questo tipo va rimosso da wm-types solo *dopo* che wm-core ha smesso di importarlo — un bump del submodule wm-types che precede il commit di rimozione in wm-core romperebbe la build TS di chiunque sincronizzi in quell'ordine. Va rispettato l'ordine wm-core → wm-types in `plan.md`/Fase: execution, non è un rischio mitigabile in codice.

## Out of scope

- `ConfigDetailBox`/`ConfigDetailInfoBox`/`ConfigDetailInfoBoxItem` (oc:8181) restano invariati — nessuna modifica alla struttura dati di `config_detail`.

## Moduli toccati

- `src/config.ts`
