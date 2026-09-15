> Ticket: oc:8406

# Unificare i componenti di dettaglio EcPoi tra webmapp-app (mobile) e wm-webapp (web)

> **Ambito di questo documento:** il solo contributo di **wm-types**, quattro righe in
> `src/feature.ts`. Il lavoro vero del ticket sta negli altri due repo: la promozione del
> componente condiviso in `wm-core`, il consumo in `wm-webapp`. I rispettivi cantieri hanno lo
> stesso slug.

## Cosa cambia

`WmProperties` dichiara due campi che prima passavano dall'index signature `[key: string]: any`:

```ts
/** Indirizzo display (backend o derivato client da addr_*). */
address?: string;
/** Indirizzo URL-safe per link mappe (join `+`). */
address_link?: string;
```

## Perché

Sono **campi derivati lato client, non campi del payload**: il backend invia
`addr_complete`, `addr_locality` e `addr_street`, e `derivePoiAddress()` in wm-core li compone nei
due valori sopra. Prima di oc:8406 quella derivazione esisteva solo dentro il popup di wm-webapp,
quindi `address` non era mai popolato per l'app — e la riga "Indirizzo" di `wm-tab-detail` leggeva
un campo che nessuno scriveva, restando invisibile.

Portata la derivazione nel componente condiviso, i due nomi diventano parte del contratto fra
wm-core e i suoi consumer, e come tali vanno dichiarati qui.

**Sono due campi distinti, non lo stesso valore formattato in due modi:** `address` unisce con
`, ` ed è ciò che si legge a schermo, `address_link` unisce con `+` ed è la forma che finisce
nell'URL di Google Maps. Dichiararne uno solo avrebbe rotto il link.

## Requisiti

- [x] `address` e `address_link` dichiarati in `WmProperties` come opzionali
- [x] Commento che dice da dove arrivano, perché il nome da solo suggerisce un campo del backend

## Rischi

Nessuno sul piano dei tipi: sono aggiunte opzionali a un'interfaccia che ha già
`[key: string]: any`, quindi nessun consumer esistente smette di compilare.

Il rischio è di lettura, ed è mitigato dai commenti: un campo dichiarato in `WmProperties` sembra
un campo che il backend manda. Questi due non lo sono, e chi li cercasse nel payload non li
troverebbe.

## Out of scope

- **Tipizzare `related_url`**, che arriva in tre forme diverse (oggetto, stringa, array) e oggi
  passa dall'index signature. Sarebbe corretto ma tocca un tipo condiviso per un beneficio che
  questo ticket non richiede: le tre forme sono gestite in `wm-core`, dove il fix serviva
  comunque. Tracciato come follow-up nel cantiere di `wm-webapp`.
- **Tipizzare `taxonomyWheres`**, per lo stesso motivo: è la sorgente della località
  nell'intestazione del dettaglio, ma resta letto dall'index signature.

## Moduli toccati

| File | Modifica |
|---|---|
| `src/feature.ts` | Due campi opzionali in `WmProperties`, con commento |
