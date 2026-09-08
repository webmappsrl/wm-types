# Filtri sui cammini in Home — tipi condivisi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> Ticket: oc:8414

**Goal:** Aggiungere a `wm-types` i tipi condivisi che rappresentano le caratteristiche filtrabili di un cammino (`LayerAttributes`), esposte dal backend in `MAP.layers[i].attributes`.

**Architecture:** Un solo file toccato (`src/config.ts`), nessuna logica applicativa. Segue esattamente il pattern già stabilito per `ConfigDetailBox` (oc:8181, stesso file) e per `LANGUAGES`/`Language` (`src/language.ts`): costanti `as const` + union type derivato, interfacce senza prefisso `I`.

**Tech Stack:** TypeScript (nessun framework — libreria di soli tipi).

**Spec:** `docs/features/8414-filtri-cammini-home/overview.md` (questo repo).

## Global Constraints

- Nessun prefisso `I` sulle nuove interfacce (pattern già in uso in questo file, es. `ConfigDetailBox`).
- Tutti i campi di `LayerAttributes` sono opzionali: assenza di una chiave = "dato non disponibile", mai un default a zero/vuoto.
- Nessuna logica applicativa in questo repo (solo tipi/costanti).
- `distance`/`stage_count` sono numeri grezzi (non wrappati in `LayerAttributeValue`); `shape`/`taxonomy_where`/`themes`/`walking_network`/`season` sono wrappati in `LayerAttributeValue<T>` — verificato contro payload reale del backend (vedi overview, sezione Requisiti).
- JSDoc breve (una riga, stile già in uso nel file: `/** ... */`) su ogni nuovo export.

---

### Task 1: Tipi condivisi `LayerAttributes` in `src/config.ts`

**Files:**
- Modify: `src/config.ts` (fine del file, dopo `ConfigDetailInfoBoxItem`)

**Interfaces:**
- Consumes: `Language` da `./language` (già importato in questo file, riga 1: `import {Language} from './language';`)
- Produces: `RouteShape`, `WalkingNetwork`, `Season`, `LayerAttributeValue<T>`, `LayerAttributes` — consumati da `wm-core` (`ILAYER.attributes`, vedi plan.md di quel repo)

- [ ] **Step 1: Aggiungere i nuovi tipi in coda a `src/config.ts`**

Aprire `core/src/app/shared/wm-types/src/config.ts` e aggiungere, dopo l'ultima riga (`ConfigDetailInfoBoxItem`):

```typescript
/** Forma del percorso (oc:8180, calcolata dal backend sulla geometria delle tappe). */
export const ROUTE_SHAPES = ['roundtrip', 'linear', 'discontinuous'] as const;
export type RouteShape = (typeof ROUTE_SHAPES)[number];

/** Portata della rete escursionistica — vocabolario OSM del tag `network`. */
export const WALKING_NETWORKS = ['lwn', 'rwn', 'nwn', 'iwn'] as const;
export type WalkingNetwork = (typeof WALKING_NETWORKS)[number];

/** Stagioni in cui il cammino è preferibilmente percorribile. */
export const SEASONS = ['spring', 'summer', 'autumn', 'winter'] as const;
export type Season = (typeof SEASONS)[number];

/**
 * Valore di un attributo filtrabile: il codice stabile più le sue traduzioni. Il backend
 * fornisce sempre entrambi — il frontend non deve tradurre i codici né conoscere gli enum
 * del backend per mostrare le label.
 */
export interface LayerAttributeValue<T extends string = string> {
  value: T;
  name: Partial<Record<Language, string>>;
}

/**
 * Caratteristiche di un cammino usate dai filtri Home (oc:8180, wm-package/camminiditalia).
 * Ogni chiave è opzionale: assente significa "dato non disponibile", non zero/vuoto.
 */
export interface LayerAttributes {
  /** Lunghezza totale in km — somma delle distanze delle tappe. */
  distance?: number;
  /** Numero di tappe del cammino. */
  stage_count?: number;
  /** Forma del percorso. */
  shape?: LayerAttributeValue<RouteShape>;
  /** Regioni attraversate (solo regioni, mai comuni). */
  taxonomy_where?: LayerAttributeValue[];
  /** Temi associati — vocabolario aperto, gestito dal cliente in backoffice. */
  themes?: LayerAttributeValue[];
  /** Portata della rete escursionistica. */
  walking_network?: LayerAttributeValue<WalkingNetwork>;
  /** Stagioni consigliate. */
  season?: LayerAttributeValue<Season>[];
}
```

- [ ] **Step 2: Verificare che il progetto compili**

Run: `cd core && npx tsc --noEmit -p src/app/shared/wm-types/tsconfig.json 2>/dev/null || npx tsc --noEmit`

Se `wm-types` non ha un `tsconfig.json` proprio invocabile isolatamente, verificare invece che l'intera app compili:

Run: `cd core && npx ng build --configuration=camminiditalia 2>&1 | tail -50`

Expected: nessun errore TypeScript relativo a `src/config.ts` (gli errori relativi a `ILAYER.attributes` sono attesi finché il Task 1 del plan.md di `wm-core` non è stato eseguito — verificare solo che non ci siano errori di sintassi/tipo *dentro* `wm-types/src/config.ts` stesso).

- [ ] **Step 3: Commit**

```bash
cd core/src/app/shared/wm-types
git add src/config.ts
git commit -m "feat(oc:8414): add shared LayerAttributes types for route filters"
```

---

## Self-Review

**Spec coverage:** l'unico requisito wm-types dell'overview (`ROUTE_SHAPES`/`RouteShape`, `WALKING_NETWORKS`/`WalkingNetwork`, `SEASONS`/`Season`, `LayerAttributeValue<T>`, `LayerAttributes` con tutti i campi opzionali) è coperto interamente dal Task 1.

**Placeholder scan:** nessuno — tutto il codice è scritto per intero, nessun TBD.

**Type consistency:** `LayerAttributes` usa esattamente gli stessi nomi di chiave (`distance`, `stage_count`, `shape`, `taxonomy_where`, `themes`, `walking_network`, `season`) che il plan.md di `wm-core` assume in `ILAYER.attributes` e nelle funzioni di `home-route-filters.utils.ts` — verificato per coerenza tra i due piani.
