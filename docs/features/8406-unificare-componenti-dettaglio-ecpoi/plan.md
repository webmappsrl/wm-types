> Ticket: oc:8406

# Piano — contributo di wm-types

**Goal:** dichiarare in `WmProperties` i due campi dell'indirizzo che il componente condiviso
deriva lato client.

**Spec:** [overview.md](overview.md)

## Global Constraints

- Ordine di dipendenza `wm-types` → `wm-core` → consumer: questo repo si tocca **per primo** e si
  pusha **prima** degli altri, altrimenti i loro gitlink puntano a un commit che non esiste.
- I campi sono opzionali: `WmProperties` è usata ovunque e un campo obbligatorio romperebbe ogni
  costruzione di un oggetto properties.

---

### Task unico: dichiarare `address` e `address_link`

**Files:** `src/feature.ts`

- [x] **Step 1: aggiungere i due campi in `WmProperties`**

```ts
/** Indirizzo display (backend o derivato client da addr_*). */
address?: string;
/** Indirizzo URL-safe per link mappe (join `+`). */
address_link?: string;
```

Il commento non è ornamentale: senza, i due nomi sembrano campi che il backend invia, mentre sono
derivati da `derivePoiAddress()` in wm-core a partire da `addr_complete`/`addr_locality`/
`addr_street`.

- [x] **Step 2: verificare che i consumer compilino**

Il controllo vero non è qui — questo repo non ha build propria che eserciti i tipi in uso — ma
nella build di `wm-webapp` con il pin aggiornato.

- [x] **Step 3: commit**

```bash
git commit -m "feat(oc:8406): dichiara address e address_link in WmProperties"
```
