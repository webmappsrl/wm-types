> Ticket: oc:8761

# Notes — date di percorrenza nella richiesta di certificazione (wm-types)

## Deviazioni dal piano

Nessuna deviazione rilevante.

## Bug trovati

Nessuno.

## Decisioni

- Il tipo garantisce che `startDate` ed `endDate` ci siano, non che siano date valide: il formato
  `AAAA-MM-GG` e i limiti li controllano il form di wm-core e il server.
- Le modifiche già presenti in `src/environment.ts` (shard `local` su `127.0.0.1:8000`) e in
  `.gitignore` (`dist/`) non appartengono al ticket e restano fuori dal commit.

## Follow-up

- Il bump di wm-types nella root di webmapp-app va nello stesso commit del bump di wm-core: uno
  solo dei due rompe la build dell'app.
