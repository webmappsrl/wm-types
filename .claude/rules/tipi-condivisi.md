---
paths:
  - "src/**"
---

# Trappole: tipi condivisi e redirect

Il perché delle singole scelte sta nelle pagine di [docs/knowledge/](../../docs/knowledge/).

- **Un tipo esportato si rimuove da qui solo dopo che tutti i consumer hanno smesso di
  importarlo.** Un bump del submodule che precedesse quel commit romperebbe la build TypeScript di
  chi sincronizza in quell'ordine — e i consumer sono quattro: `wm-core`, `map-core`, `wm-webapp`,
  `webmapp-app`. La guardia è un `grep -rn "<NomeTipo>"` sull'intero albero sorgente **prima** di
  togliere la riga, non dopo.

- **Le chiavi di `OPTIONS` sono camelCase, non snake_case.** Si chiama `showFavorites`, non
  `show_favorites`: qui il nome non segue la convenzione del backend, e sbagliarlo produce un flag
  che nessun `config.json` valorizzerà mai — senza errori, solo una feature che non si accende.

- **Il matching dei redirect è per sottostringa**: `hostname.includes(key)`. Quindi
  `www.maps.esempio.it` matcha la entry `maps.esempio.it` da solo, e una chiave corta matcha più
  domini di quanti se ne intendano. Sceglila abbastanza specifica.

- **Un redirect va deployato prima che il virtualhost punti alla nuova webapp.** Nell'ordine
  inverso l'app riceve `NaN` come `appId`, e il sintomo non dice da dove viene.

- **Niente logica applicativa in questo repo**: solo interfacce, tipi e costanti. Se serve un
  default, un selettore o una funzione, il posto è il consumer — anche quando aggiungerlo qui
  sarebbe più comodo.
