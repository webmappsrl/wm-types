# Fix scroll e animazione doppia in wm-config-detail — tipi condivisi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> Ticket: oc:8427

**Goal:** Aggiungere a `wm-types` il tipo condiviso `ConfigDetailToggleEvent`, payload del nuovo `@Output()` che `wm-config-detail` (wm-core) userà per notificare apertura/chiusura di un item ai consumer (`wm-core`: `home-layer`/`track-properties`/`home.component`; `webmapp-app`: `poi-properties`/`map-details`).

**Architecture:** Un solo file toccato (`src/config.ts`), nessuna logica applicativa. Segue il pattern già stabilito per `ConfigDetailBox`/`ConfigDetailInfoBox`/`ConfigDetailInfoBoxItem` (oc:8181, stesso file): interfacce senza prefisso `I`, JSDoc breve.

**Tech Stack:** TypeScript (nessun framework — libreria di soli tipi).

**Spec:** `docs/features/8427-fix-scroll-animazione-doppia-wm-config-detail/overview.md` (questo repo).

## Global Constraints

- Nessun prefisso `I` sulle nuove interfacce (pattern già in uso in questo file).
- Nessuna logica applicativa in questo repo (solo tipi).
- JSDoc breve (una riga per campo, stile già in uso nel file) su ogni nuovo export.
- Questo piano è un **prerequisito** dei plan.md di `wm-core` e `webmapp-app` per lo stesso ticket: entrambi importano `ConfigDetailToggleEvent` da `@wm-types/config` — va eseguito e il submodule aggiornato prima di iniziarli.

---

### Task 1: Tipo condiviso `ConfigDetailToggleEvent` in `src/config.ts`

**Files:**
- Modify: `src/config.ts` (dopo `ConfigDetailInfoBoxItem`, riga 162 nella versione corrente)

**Interfaces:**
- Consumes: nessuno (tipo autonomo, solo tipi built-in TypeScript/DOM)
- Produces: `ConfigDetailToggleEvent` — consumato da `wm-core` (`ConfigDetailComponent.toggled`, vedi plan.md di quel repo) e da `webmapp-app` (`MapDetailsComponent.onProjectedContentToggle()`, vedi plan.md di quel repo)

- [ ] **Step 1: Aggiungere il nuovo tipo in `src/config.ts`, subito dopo `ConfigDetailInfoBoxItem`**

Aprire `core/src/app/shared/wm-types/src/config.ts` e aggiungere, dopo il blocco:

```typescript
export interface ConfigDetailInfoBoxItem {
  title?: Partial<Record<Language, string>>;
  content?: Partial<Record<Language, string>>;
}
```

il nuovo tipo:

```typescript
/**
 * Payload emesso da `ConfigDetailComponent.toggled` (wm-core) ad ogni apertura/chiusura di un
 * item dell'accordion `wm-config-detail` — nessuno scroll viene eseguito dal componente stesso,
 * solo il consumer (che conosce il proprio contesto di montaggio, es. presenza di un pannello
 * ridimensionabile) decide se e quando spostare la vista (oc:8427).
 */
export interface ConfigDetailToggleEvent {
  /** `true` se l'item è stato appena aperto, `false` se è stato chiuso. */
  opening: boolean;
  /** Elemento header (`<button>`) dell'item appena aperto, per un eventuale `scrollIntoView` del consumer. `null` in chiusura. */
  headerElement: HTMLElement | null;
}
```

- [ ] **Step 2: Verificare che il progetto compili**

Run: `cd core && npx ng build --configuration=camminiditalia 2>&1 | tail -50`

Expected: nessun errore TypeScript relativo a `src/config.ts` stesso (eventuali errori in `wm-core`/`webmapp-app` che referenziano `ConfigDetailToggleEvent` sono attesi finché i Task di quei plan.md non sono stati eseguiti — verificare solo l'assenza di errori di sintassi/tipo *dentro* questo file).

- [ ] **Step 3: Commit**

```bash
cd core/src/app/shared/wm-types
git add src/config.ts
git commit -m "feat(oc:8427): add shared ConfigDetailToggleEvent type"
```

---

## Self-Review

**Spec coverage:** l'unico requisito wm-types dell'overview (`ConfigDetailToggleEvent` con `opening`/`headerElement`, nessun prefisso `I`) è coperto interamente dal Task 1.

**Placeholder scan:** nessuno — codice scritto per intero, nessun TBD.

**Type consistency:** `ConfigDetailToggleEvent.opening`/`headerElement` usano esattamente gli stessi nomi che i plan.md di `wm-core` e `webmapp-app` assumono per il payload dell'`@Output() toggled` e del metodo `onProjectedContentToggle()` — verificato per coerenza tra i tre piani.
