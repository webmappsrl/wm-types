> Ticket: oc:8039

# Aggiornare web app maps.valdicecinaoutdoor.it

## Cosa cambia
Viene aggiunta una entry nell'oggetto `redirects` di `src/environment.ts` in modo che, quando la webapp viene caricata dal dominio `maps.valdicecinaoutdoor.it`, utilizzi automaticamente l'`appId` 64 sullo shard `geohub`.

## Perché
Il sito `maps.valdicecinaoutdoor.it` punta attualmente alla vecchia webapp. Per servire la nuova web app Angular/Ionic su quel dominio, l'app deve riconoscere l'hostname e caricare la configurazione corretta (appId 64, shard geohub).

## Requisiti
- [ ] Aggiungere `'maps.valdicecinaoutdoor.it': { shardName: 'geohub', appId: 64 }` all'oggetto `redirects` in `src/environment.ts`

## Rischi
- Nessun rischio architetturale: il meccanismo `redirects` è già consolidato e usato da altri domini analoghi.

## Out of scope
- Aggiornamento del virtualhost sul server (task separato)
- Deploy della nuova webapp su `maps.valdicecinaoutdoor.it` (task separato)
- Variante `www.maps.valdicecinaoutdoor.it` (non richiesta)
- Commit e allineamento del submodule in wm-webapp (gestiti manualmente dal developer)

## Moduli toccati
- `src/environment.ts` — aggiunta entry in `redirects`
