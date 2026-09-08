> Ticket: oc:8458

# Accordion wm-config-detail: apertura multipla e rimozione scrollIntoView — wm-types Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rimuovere il tipo `ConfigDetailToggleEvent` da `src/config.ts` — dead code dopo che wm-core e webmapp-app hanno smesso di dispacciare/consumare l'evento `configDetailSettled` (stesso ticket, altri due piani).

**Architecture:** Un solo file toccato, nessuna logica applicativa — rimozione di un'unica interfaccia.

**Tech Stack:** TypeScript (nessun framework — libreria di soli tipi).

**Spec:** `docs/features/8458-accordion-wm-config-detail-apertura-multipla/overview.md` (questo repo).

**Piani correlati (stesso ticket, altri repo, DA ESEGUIRE PRIMA DI QUESTO):** `wm-core/docs/features/8458-.../plan.md` e `webmapp-app/docs/features/8458-.../plan.md` — entrambi rimuovono il proprio (unico) uso di `ConfigDetailToggleEvent`. Questo piano va eseguito **per ultimo**: se il tipo viene rimosso da questo repo prima che gli altri due smettano di importarlo, la build TS di wm-core e webmapp-app si rompe per chiunque sincronizzi il submodule in quell'ordine (rischio identificato in Fase: challenge).

## Global Constraints

- Nessun prefisso `I` sulle interfacce di questo file (pattern già in uso).
- Nessuna logica applicativa in questo repo (solo tipi).
- Nessuna modifica a `ConfigDetailBox`/`ConfigDetailInfoBox`/`ConfigDetailInfoBoxItem` (oc:8181) — restano invariati.

---

### Task 1: Rimuovere il tipo `ConfigDetailToggleEvent` da `src/config.ts`

**Files:**
- Modify: `src/config.ts`

**Interfaces:**
- Consumes: nessuno.
- Produces: nessuno — questo task rimuove un'interfaccia, non ne introduce.

- [ ] **Step 1: Verificare che nessun consumer lo referenzi ancora**

Run: `grep -rn "ConfigDetailToggleEvent" /Users/peco/Documents/Apps/webmapp-app/core/src --include='*.ts' --include='*.html'`
Expected: nessun risultato al di fuori di questo repo (`wm-types`) — se compare ancora in `wm-core` o `webmapp-app`, quei piani non sono stati completati: **fermarsi e non procedere con lo Step 2** finché non risulta vuoto.

- [ ] **Step 2: Rimuovere l'interfaccia e il relativo JSDoc da `src/config.ts`**

Rimuovere interamente il blocco (attualmente subito dopo `ConfigDetailInfoBoxItem`):

```typescript
/**
 * Payload (`detail`) del `CustomEvent('configDetailSettled')` dispacciato da `ConfigDetailComponent`
 * (wm-core) dal proprio host DOM, con `bubbles: true` — non un `@Output()` Angular, per
 * attraversare i confini di content projection senza che i componenti intermedi (`wm-home-layer`,
 * `wm-track-properties`, `wm-poi-properties`) debbano fare pass-through (oc:8427).
 *
 * Dispacciato SOLO dopo che il layout è ritenuto assestato (debounce breve dopo l'ultima
 * `transitionend` pertinente sul proprio sottoalbero, con fallback a timeout se non arriva mai —
 * vedi `ConfigDetailComponent` per i dettagli), non sincrono al click. Nessuno scroll/resize viene
 * eseguito dal componente stesso: solo il consumer (che conosce il proprio contesto di montaggio,
 * es. presenza di un pannello ridimensionabile) decide se e quando spostare la vista.
 */
export interface ConfigDetailToggleEvent {
  /** `true` se l'item è stato appena aperto, `false` se è stato chiuso. */
  opening: boolean;
  /** Elemento header (`<button>`) dell'item appena aperto, per un eventuale `scrollIntoView` del consumer. `null` in chiusura. */
  headerElement: HTMLElement | null;
}
```

- [ ] **Step 3: Verificare che il progetto compili**

Run: `cd core && npx ng build --configuration=camminiditalia 2>&1 | tail -50`
Expected: nessun errore TypeScript — a differenza di oc:8427 (dove questo comando era eseguito PRIMA che wm-core/webmapp-app avessero il loro import pronto), qui la build deve risultare pulita perché lo Step 1 ha già verificato che nessun consumer referenzi più il tipo.

- [ ] **Step 4: Commit**

```bash
cd core/src/app/shared/wm-types
git add src/config.ts
git commit -m "feat(oc:8458): remove unused ConfigDetailToggleEvent type"
```

---

## Self-Review

**Spec coverage:** l'unico requisito wm-types dell'overview (rimozione di `ConfigDetailToggleEvent`) è coperto dal Task 1, con una guardia esplicita (Step 1) contro l'esecuzione prematura rispetto agli altri due piani.

**Placeholder scan:** nessuno — ogni step ha codice o comando completo.

**Type consistency:** n/a — questo piano rimuove un tipo, non ne introduce di nuovi da coordinare con altri task.
