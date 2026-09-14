# Props degli eventi PostHog

> La popolazione dei campi a runtime — selettore `auth.user`, gating sull'utente loggato, il
> `TODO identify()` — vive interamente in `wm-core`: `docs/knowledge/posthog.md` di quel repo.

## Come funziona oggi

`WmPosthogProps` (`src/posthog.ts`) espone `user_id?: number`, opzionale e omesso per gli utenti anonimi. `GeolocationMode` (`src/user-activity.ts`) è la union `'navigation' | 'recording' | 'stopped'`, condivisa fra `GeolocationService` e il campo `mode` delle props.

## Perché così

- **`user_id` è un `number`, non una stringa** (oc:8159), a differenza degli altri id di contesto dello stesso file (`layer_id`, `track_id`, stringificati lato `wm-core`): la scelta tiene il tipo coerente con `IUser.id: number` senza introdurre coercizioni. Verificato in review che non ci fosse mismatch col consumer.
- **`GeolocationMode` sta qui** (oc:8127) per non ripetere la union literal fra il service e le props.
- **Nessuna logica applicativa in questo repo**: è la regola del repo, e vale anche quando sarebbe comodo derogarvi per un campo solo.
