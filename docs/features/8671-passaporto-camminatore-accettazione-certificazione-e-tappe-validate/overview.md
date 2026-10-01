> Ticket: oc:8671

# Passaporto camminatore: accettazione della richiesta di certificazione e tappe validate

## Cosa cambia

`src/passport.ts`: lo stato della richiesta di certificazione passa da `'none' | 'pending'` a
`'none' | 'pending' | 'approved' | 'rejected'`, e `PassportCertification` porta anche la data
della decisione e la nota del gestore, facoltative.

## Perché

Il backend camminiditalia di oc:8671 restituisce l'ultima richiesta in qualunque stato, e il
dettaglio del passaporto in `wm-core` deve mostrarne l'esito. Il contesto completo è nell'overview
dello stesso slug in `wm-core`.

## Requisiti

- [ ] `PassportCertificationStatus` con i quattro stati.
- [ ] `PassportCertification` con `decidedAt?` e `decisionNote?`.

## Rischi

Allargare il tipo è compatibile per chi lo legge. Tornare indietro rompe la compilazione di chi
usa già i valori nuovi: `wm-types` e `wm-core` vanno aggiornati insieme nei due prodotti.

## Out of scope

Tutto il resto della feature, descritto nell'overview di `wm-core`.

## Moduli toccati

- `src/passport.ts`
