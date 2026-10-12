> Ticket: oc:8763

# Passaporto per singolo cammino — piano tipi

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `PassportRoute` descrive un cammino acceso con le sue tappe convalidate; `PassportStageIndex`
sa quali cammini sono accesi invece di quali sono in attesa.

**Architecture:** solo tipi in `src/passport.ts`; nessuna logica.

**Tech Stack:** TypeScript.

**Spec:** [overview.md](overview.md).

## Global Constraints

- Nessun prefisso `I`; nessuna logica applicativa.
- `npm run build` deve passare; il consumer `wm-core` si aggiorna nello stesso lavoro.

## Review Focus

Nessuno: i tipi non hanno comportamento; la verifica è la build di `wm-core`.

---

### Task 1: `PassportRoute.validatedTracks` e `PassportStageIndex.enabledLayers`

> Nota: rispetto all'overview, `pendingLayers` non viene solo rimosso ma sostituito da
> `enabledLayers`, che serve al chip per sapere se la tappa sta in un cammino acceso.

**Files:**
- Modify: `src/passport.ts:60-82`

**Interfaces:**
- Produces:
  - `PassportRoute.validatedTracks: Record<number, string>` (id tappa → data ISO 8601).
  - `PassportStageIndex = { completedAt: Map<number, string>; enabledLayers: Set<number> }` —
    `pendingLayers` rimosso.

- [ ] **Step 1:** `grep -rn pendingLayers` su `core/src/app/shared/` dell'app: gli unici usi sono in
  `wm-core/passport/`.
- [ ] **Step 2:** modificare i due tipi e i loro commenti (`PassportRoute`: «cammino col passaporto
  acceso, anche senza tappe convalidate»).
- [ ] **Step 3:** `npm run build` → nessun errore.
- [ ] **Step 4: Commit (istruzione per il dev)** `feat(oc:8763): tipi del passaporto per i cammini accesi`
