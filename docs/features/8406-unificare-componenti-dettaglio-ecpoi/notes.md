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
