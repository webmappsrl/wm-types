> Ticket: oc:8406

# Notes — contributo di wm-types

## Deviazioni dal piano

Nessuna. Il contributo è di quattro righe ed è andato come previsto.

## Decisioni

- **Dichiarati qui e non lasciati all'index signature.** `WmProperties` ha `[key: string]: any`,
  quindi i due campi avrebbero funzionato anche senza dichiarazione. Sono stati dichiarati perché
  dal ticket in avanti fanno parte del contratto fra `wm-core` e i suoi consumer: `derivePoiAddress()`
  li produce, il componente del dettaglio li legge, e un nome non dichiarato è un nome che si può
  cambiare senza che nulla lo segnali.

- **Due campi e non uno.** `address` unisce i segmenti con `, ` ed è il testo mostrato;
  `address_link` li unisce con `+` ed è la forma che finisce nell'URL di Maps. Erano due valori
  distinti anche nel codice originale del popup di wm-webapp, e collassarli in uno avrebbe rotto
  il link.

- **`related_url` e `taxonomyWheres` lasciati all'index signature.** Entrambi sarebbero da
  tipizzare — il primo arriva in tre forme diverse, il secondo è la sorgente della località
  nell'intestazione — ma toccano un tipo condiviso per un beneficio che questo ticket non
  richiede. Le tre forme di `related_url` sono gestite in `wm-core`, dove il fix serviva comunque.
  Tracciati come follow-up nel cantiere di `wm-webapp`.

## Bug trovati

- **`properties.address` non è mai stato un campo del backend.** Prima di oc:8406 nessuno lo
  popolava: non era dichiarato qui, nessuno lo scriveva in wm-core o map-core, e il backend invia
  `addr_complete`/`addr_locality`/`addr_street`. L'unico posto che lo componeva era il popup di
  wm-webapp, cioè il codice che il ticket ha reso obsoleto. Conseguenza: la riga "Indirizzo" di
  `wm-tab-detail` leggeva un campo sempre `undefined` e non si è mai vista sull'app.

## Follow-up

- Tipizzare `related_url` come union (`string | string[] | Record<string, string>`): il caso più
  frequente da coprire è l'array vuoto, 2.572 POI, non la stringa.
- Tipizzare `taxonomyWheres` (array di stringhe, ordinato regione → provincia → comune).

## `address_link` è stato rimosso: la motivazione era sbagliata

Questi documenti sostengono che i campi debbano essere due, e che «dichiararne uno solo avrebbe
rotto il link». **Non è vero**, e l'ha fatto notare una review esterna.

`address_link` unisce con `+` per pre-codificare gli spazi, ma chi costruisce il link — `wm-address`
in wm-core — passa il valore per `encodeURIComponent`, che trasforma quei `+` in `%2B`: un più
letterale dentro l'indirizzo. Con `addr_complete = "Via Roma 1, Pisa"` Google riceveva
`daddr=Via%2BRoma%2B1%2C%2BPisa` invece di `Via%20Roma%201%2C%20Pisa`. Le due codifiche si
annullavano a vicenda, e il campo pensato per proteggere il link era esattamente ciò che lo rompeva.

Il difetto viveva sul percorso EC, cioè quello principale: il ramo UGC era già stato portato su
`address` in precedenza, e la divergenza fra i due è ciò che ha reso il problema visibile.

Corretto costruendo il link da `address`, e rimosso `address_link` da tutta la catena — l'input di
`wm-address`, il binding nel template, il valore restituito da `derivePoiAddress`, e infine questa
dichiarazione. L'ordine è quello che la regola del repo impone: prima smettono di usarlo i
consumer, poi il tipo sparisce.
