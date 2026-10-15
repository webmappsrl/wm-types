> Ticket: oc:8761

# Passaporto: data di inizio e di fine percorrenza obbligatorie nella richiesta di certificazione

Questa è la parte wm-types. Il form sta in wm-core e la parte server nel backend camminiditalia:
ciascuno ha la propria overview con lo stesso slug.

## Cosa cambia

`PassportCertificationRequest` riceve due campi obbligatori, `startDate` ed `endDate`: le date in
cui il camminatore ha percorso il cammino, come stringhe `AAAA-MM-GG`. Il service di wm-core le
invia al server come `start_date` ed `end_date` nel multipart.

## Perché

Cammini d'Italia vuole le date di percorrenza per le statistiche e le considera obbligatorie,
perché la richiesta è un atto formale (call del 12/10/2026). Il tipo è il contratto fra il form e
il service: senza i due campi il compilatore non obbliga il form a passarli.

## Requisiti

- [ ] `startDate: string` ed `endDate: string` in `PassportCertificationRequest`, con JSDoc che
      dice il formato (`AAAA-MM-GG`, data locale del camminatore) e il nome del campo nel
      multipart (`start_date`, `end_date`), come per gli altri campi.

## Rischi

- Un campo obbligatorio in più rompe la compilazione di chiunque costruisca una
  `PassportCertificationRequest` senza date. Oggi la costruiscono `passport-form` in wm-core e il
  factory `request()` di `passport.service.spec.ts`, che cambiano nello stesso lavoro. La webapp
  oggi non monta ancora il passaporto.
- Il tipo e il form vanno nella root insieme: un bump del solo wm-types (o del solo wm-core)
  rompe la build di webmapp-app. I due bump dei submodule vanno nello stesso commit della root.
- Il tipo garantisce che la chiave ci sia, non che il valore sia una data valida: il formato
  `AAAA-MM-GG` e i limiti li garantiscono il form e il server.

## Out of scope

- Esporre le date nella risposta dell'API sullo stato della richiesta (`PassportCertification`):
  l'API verso l'app resta invariata.

## Moduli toccati

- `src/passport.ts` (`PassportCertificationRequest`)
