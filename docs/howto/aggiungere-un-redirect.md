# Aggiungere un dominio custom (redirect)

Quando la webapp viene caricata da un dominio presente in `redirects`, usa l'`appId` e lo
`shardName` dichiarati lì invece di quelli di default.

1. Aggiungi la entry all'oggetto `redirects` in `src/environment.ts`, scegliendo una chiave
   abbastanza specifica: il matching è `hostname.includes(key)`, quindi una chiave corta matcha
   più domini di quanti se ne intendano.
2. Committa qui e allinea il submodule nei repo che lo montano.
3. **Solo dopo** fai puntare il virtualhost alla nuova webapp: nell'ordine inverso l'app riceve
   `NaN` come `appId`.

Virtualhost e deploy sono task separati da questo repo.
