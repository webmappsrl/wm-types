> Ticket: oc:8039

# Notes — Aggiornare web app maps.valdicecinaoutdoor.it

## Deviazioni dal piano
Nessuna.

## Bug trovati
Nessuno.

## Decisioni
- Scope ridotto rispetto al titolo del ticket: virtualhost e deploy sono task separati. La modifica di codice è solo l'aggiunta del redirect in `wm-types`.
- L'allineamento del submodule in `wm-webapp` è gestito manualmente dal developer.

## Follow-up
- Allineamento submodule `wm-types` in `wm-webapp` dopo il commit (⚠️ deve avvenire prima dell'aggiornamento del virtualhost).
- Verificare che appId 64 su geohub sia configurato e pronto prima del go-live.
- Il meccanismo `redirects` usa `hostname.includes()` (sottostringa): `www.maps.valdicecinaoutdoor.it` matcherebbe automaticamente il redirect, ma non è un problema se il DNS per `www.` non è configurato.
- Cache PWA/Service Worker: utenti con vecchia webapp in cache potrebbero non vedere la nuova immediatamente dopo il go-live. Valutare un cache busting al momento del deploy.
- Non esistono test che coprano il meccanismo `redirects` per questo dominio. Da considerare in un ciclo successivo.
