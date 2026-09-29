> Ticket: oc:8406

# Unificare i componenti di dettaglio EcPoi tra webmapp-app (mobile) e wm-webapp (web)

> **Ambito di questo documento:** il solo contributo di **wm-types**, in `src/feature.ts`. Il
> lavoro vero del ticket sta negli altri due repo: la promozione del componente condiviso in
> `wm-core`, il consumo in `wm-webapp`. I rispettivi cantieri hanno lo stesso slug.

## Stato raggiunto

`WmProperties` dichiara **un solo** campo derivato lato client:

```ts
/** Indirizzo display (backend o derivato client da addr_*). */
address?: string;
```

`derivePoiAddress()` in wm-core lo compone da `addr_complete` / `addr_locality` / `addr_street`
(e rispetta un `address` già presente). Il link di Google Maps si costruisce da `address` con
`encodeURIComponent` in `wm-address`.

In corso d'opera era stato aggiunto anche `address_link` (join con `+` per l'URL). **È stato
rimosso** nello stesso ticket: quella pre-codifica e `encodeURIComponent` si annullavano a
vicenda (`+` → `%2B`). Cronologia e perché in [notes.md](notes.md).

## Perché

Sono **campi derivati lato client, non campi del payload**: il backend invia `addr_complete`,
`addr_locality` e `addr_street`. Prima di oc:8406 quella derivazione esisteva solo dentro il
popup di wm-webapp, quindi `address` non era mai popolato per l'app — e la riga "Indirizzo" di
`wm-tab-detail` leggeva un campo che nessuno scriveva.

Portata la derivazione nel componente condiviso, il nome diventa parte del contratto fra wm-core
e i suoi consumer, e come tale va dichiarato qui.

## Requisiti

- [x] `address` dichiarato in `WmProperties` come opzionale
- [x] Commento che dice da dove arriva (non è un campo del backend)
- [x] `address_link` rimosso dopo la review (vedi notes)

## Rischi

Nessuno sul piano dei tipi: aggiunta (poi rimozione) opzionale su un'interfaccia con
`[key: string]: any`.

Il rischio di lettura resta mitigato dal commento: un campo in `WmProperties` sembra mandato
dal backend; `address` non lo è.

## Out of scope

- **Tipizzare `related_url`**, che arriva in tre forme diverse (oggetto, stringa, array) e oggi
  passa dall'index signature. Tracciato come follow-up nel cantiere di `wm-webapp`.
- **Tipizzare `taxonomyWheres`**, per lo stesso motivo: è la sorgente della località
  nell'intestazione del dettaglio, ma resta letto dall'index signature.

## Moduli toccati

| File | Modifica |
|---|---|
| `src/feature.ts` | Campo opzionale `address` in `WmProperties` (e rimozione di `address_link`) |
