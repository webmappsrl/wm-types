> Ticket: oc:8427

# Fix scroll e animazione doppia in wm-config-detail (accordion + modalità full)

## Cosa cambia

Aggiunta di un nuovo tipo condiviso `ConfigDetailToggleEvent`, payload del nuovo `@Output()` che `wm-config-detail` (wm-core) userà per notificare ai consumer ogni apertura/chiusura di un item, senza eseguire scroll internamente (vedi overview wm-core e webmapp-app per il contesto completo del fix).

## Perché

Il tipo è condiviso tra `wm-core` (chi lo emette) e `webmapp-app` (chi lo consuma in `map-details.component.ts`/`poi-properties.component.ts`) — coerente con il precedente di `ConfigDetailBox`/`ConfigDetailInfoBox`/`ConfigDetailInfoBoxItem` (oc:8181), già ospitati qui come fonte di verità dei tipi relativi a `config_detail`.

## Requisiti

- [ ] Nuovo tipo `ConfigDetailToggleEvent` in `src/config.ts`, vicino ai tipi `ConfigDetailBox`/`ConfigDetailInfoBox`/`ConfigDetailInfoBoxItem` esistenti: `{opening: boolean; headerElement: HTMLElement | null}`.
- [ ] Nessun prefisso `I` (convenzione già in uso per gli altri tipi di questo file).

## Rischi

- **Precedente misto nel repo**: un caso concettualmente simile (`UgcTrackShareResult`, oc:8183) è stato tenuto locale al componente wm-core invece che spostato qui — la scelta di questo ciclo (mettere il tipo in wm-types) è stata una decisione esplicita del developer in Fase: write-plan, non l'applicazione automatica di una regola univoca. Documentato per chiarezza futura, non un rischio funzionale.
- **`HTMLElement` come campo di un tipo condiviso cross-repo**: è un tipo del DOM, non serializzabile/persistibile — coerente con l'uso previsto (solo comunicazione sincrona in-memory tra componenti Angular nello stesso runtime), ma da non confondere con gli altri campi di questo file che rappresentano dati da/verso backend.

## Out of scope

- Nessuna modifica ai tipi esistenti (`ConfigDetailBox`, `ConfigDetailInfoBox`, `ConfigDetailInfoBoxItem`).

## Moduli toccati

- `core/src/app/shared/wm-types/src/config.ts` — nuovo tipo `ConfigDetailToggleEvent`.
