> Ticket: oc:8159

# Tracciamento bacino di utenza per cammino — user_id in WmPosthogProps

## Cosa cambia

Aggiunta del campo opzionale `user_id?: number` all'interfaccia `WmPosthogProps` (`src/posthog.ts`), per permettere di associare gli eventi PostHog inviati dall'app all'utente autenticato del backend (id numerico di `IUser`).

## Perché

Emerso da una call col cliente, come specifica aggiuntiva al ticket oc:8159 (originariamente scope solo backend/wm-package): si vuole poter identificare quale utente specifico compie una determinata azione tracciata da PostHog. La necessità è generale — utile potenzialmente per tutti gli eventi, non solo `userMoved` — quindi il campo va aggiunto al tipo di contesto condiviso, non a un singolo evento specifico. Nel contesto immediato di oc:8159, abilita il riconoscimento di quale utente loggato sta percorrendo un cammino nella visualizzazione live delle posizioni GPS lato Nova (requisito 2 del ticket originale).

## Requisiti

- [ ] Aggiungere `user_id?: number` a `WmPosthogProps` (`src/posthog.ts`), tra le "Context props" auto-iniettate (sarà popolato da `PosthogContextService` su ogni `capture()`, vedi overview wm-core)

## Rischi

- Estensione additiva dell'interfaccia (campo opzionale, non-breaking) — nessun impatto sui consumer esistenti.
- **Nessuna garanzia tipizzata sull'ownership del campo**: essendo `WmPosthogProps` un'interfaccia piatta e pubblica, nulla in questo file impedisce a un futuro punto di codice (in qualunque repo consumer) di scrivere `user_id` con un valore arbitrario, bypassando `PosthogContextService`. Rischio teorico, accettato in Fase: challenge senza mitigazione dedicata (nessun caller attuale lo fa).
- **Assunzione di stabilità del tipo**: `user_id: number` assume che `IUser.id` resti un id numerico stabile nel tempo; una futura migrazione a UUID lato backend richiederebbe un aggiornamento coordinato di questo tipo. Non mitigato in questo ciclo, rischio basso nel breve termine.
- I rischi sostanziali (privacy, scope su tutti gli eventi, coerenza con la promessa di anonimato della vista live-position) sono discussi ed esplicitamente accettati/decisi nell'overview di wm-core (Fase: challenge), dove vive la logica di popolamento del campo.

## Out of scope

- Nessuna modifica ad `AnalyticsService`/query HogQL lato `wm-package` (dato non consumato da query backend in questo ciclo — confermato esplicitamente in reverse-interaction)
- Nessun gate di consenso privacy dedicato (decisione esplicita: coerenza col comportamento attuale di PostHog, che oggi non ha gate di privacy su nessun campo/evento)
- Nessun flag `OPTIONS` di gating per-shard (il campo è sempre attivo su tutte le istanze, non solo `camminiditalia`)
- Chiamata a `identify()` per il merge di identità PostHog cross-device (valutata e scartata per questo ciclo — lasciata come TODO in wm-core)

## Moduli toccati

- `src/posthog.ts` (interfaccia `WmPosthogProps`)
