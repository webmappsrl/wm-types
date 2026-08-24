> Ticket: oc:8159

# Aggiunta user_id a WmPosthogProps — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aggiungere il campo opzionale `user_id?: number` all'interfaccia `WmPosthogProps`, per permettere a `PosthogContextService` (wm-core, piano separato nello stesso ticket) di popolarlo con l'id dell'utente autenticato su ogni evento PostHog.

**Architecture:** Modifica additiva e non-breaking a un'interfaccia TypeScript esistente in un repo che contiene solo tipi condivisi (nessuna logica applicativa qui).

**Tech Stack:** TypeScript.

## Global Constraints

- Nessuna logica applicativa va in questo repo (`wm-types`) — solo la definizione del tipo.
- Il campo deve essere opzionale (`?`) per restare non-breaking verso i consumer esistenti (`wm-core`, `map-core`).
- Nessun test automatico è richiesto/possibile in questo repo per questo task (nessuna logica da testare, solo un tipo).
- Commit convention: `feat(oc:8159): ...`. Non eseguire il commit automaticamente — è un'istruzione testuale per lo sviluppatore.

---

### Task 1: Aggiungere `user_id` a `WmPosthogProps`

**Files:**
- Modify: `src/posthog.ts:27-51` (interfaccia `WmPosthogProps`)

**Interfaces:**
- Consumes: nessuna (modifica isolata a un tipo esistente)
- Produces: `WmPosthogProps.user_id?: number` — consumato da `PosthogContextService._buildContext()` in wm-core (vedi `wm-core/docs/features/8159-tracciamento-bacino-di-utenza-per-cammino/plan.md`, Task 1)

- [ ] **Step 1: Aggiungere il campo al tipo**

In `src/posthog.ts`, dentro l'interfaccia `WmPosthogProps` (righe 27-51), aggiungere `user_id` subito dopo `ugc_track_id` (riga 34), ancora sotto il commento "Context props — auto-injected by PosthogContextService on every event" (riga 28), perché è popolato con lo stesso meccanismo automatico degli altri campi di quel gruppo:

```typescript
export interface WmPosthogProps {
  // Context props — auto-injected by PosthogContextService on every event
  user_location?: Location;
  layer_id?: string;
  poi_id?: string;
  ugc_poi_id?: string;
  track_id?: string;
  ugc_track_id?: string;
  /** Id dell'utente autenticato (IUser.id, wm-core), omesso se l'utente non è loggato. */
  user_id?: number;
  // Event-specific props
  filter_type?: string;
  filter_id?: string;
  filter_name?: string;
  slider_value?: string;
  tab?: string;
  content_type?: string;
  content_id?: string;
  query?: string;
  results_count?: number;
  layer_name?: string;
  layer_label?: string;
  favorite?: boolean;
  mode?: GeolocationMode;
  // App-specific props
  appName?: string;
}
```

- [ ] **Step 2: Verificare la compilazione TypeScript**

Run: `cd /Users/peco/Documents/Apps/webmapp-app/core && npx tsc --noEmit -p tsconfig.json`
Expected: nessun nuovo errore di compilazione (il campo è opzionale, nessun consumer esistente può rompersi).

- [ ] **Step 3: Commit**

```bash
git add src/posthog.ts
git commit -m "feat(oc:8159): add optional user_id to WmPosthogProps"
```

---

## Self-Review

- **Copertura overview**: l'unico requisito di `docs/features/8159-tracciamento-bacino-di-utenza-per-cammino/overview.md` (wm-types) è l'aggiunta del campo — coperto dal Task 1.
- **Nessun placeholder**: lo snippet mostra il file risultante completo, nessun "TODO"/"implementa dopo".
- **Coerenza di tipo**: `user_id?: number` è lo stesso nome/tipo che il piano wm-core si aspetta di popolare (`user?.id` da `IUser.id: number`, wm-core `auth.model.ts:2`) — nessun disallineamento.
