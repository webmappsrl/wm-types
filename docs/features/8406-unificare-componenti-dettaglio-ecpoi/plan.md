> Ticket: oc:8406

# Piano — contributo di wm-types

**Goal:** dichiarare in `WmProperties` il campo `address` che il componente condiviso deriva
lato client. (`address_link` era nel piano iniziale; rimosso dopo review — vedi notes.)

**Spec:** [overview.md](overview.md)

## Global Constraints

- Ordine di dipendenza `wm-types` → `wm-core` → consumer: questo repo si tocca **per primo** e si
  pusha **prima** degli altri, altrimenti i loro gitlink puntano a un commit che non esiste.
- I campi sono opzionali: `WmProperties` è usata ovunque e un campo obbligatorio romperebbe ogni
  costruzione di un oggetto properties.

---

### Task 1: dichiarare `address` (e, in un secondo momento, togliere `address_link`)

**Files:** `src/feature.ts`

- [x] **Step 1: aggiungere `address` in `WmProperties`**

```ts
/** Indirizzo display (backend o derivato client da addr_*). */
address?: string;
```

Il commento non è ornamentale: senza, il nome sembra un campo che il backend invia, mentre è
derivato da `derivePoiAddress()` in wm-core a partire da `addr_complete`/`addr_locality`/
`addr_street`.

- [x] **Step 2: verificare che i consumer compilino**

Il controllo vero non è qui — questo repo non ha build propria che eserciti i tipi in uso — ma
nella build di `wm-webapp` / `webmapp-app` con il pin aggiornato.

- [x] **Step 3: commit iniziale**

```bash
git commit -m "feat(oc:8406): dichiara address e address_link in WmProperties"
```

(Il messaggio storico menziona ancora `address_link`: a quel punto il campo c'era.)

- [x] **Step 4: rimuovere `address_link` dopo che i consumer hanno smesso di usarlo**

```bash
git commit -m "refactor(oc:8406): rimuovi address_link, la sua ragione era sbagliata"
```
