> Ticket: oc:8166

# Passaporto camminatore: validazione credenziale cartacea

## Cosa cambia

`wm-types` riceve i tipi del contratto API del passaporto: progresso di un cammino per l'utente
(tappe percorse, totale, stato di ogni tappa) e richiesta di certificazione della credenziale
cartacea (stato, data di invio, dati inviati). Solo tipi, nessuna logica né default.

## Perché

Il backend camminiditalia per questa funzione non esiste ancora: il frontend di `wm-core` lavora
su un service mockato. Fissare il contratto qui lo rende il vocabolario condiviso fra il frontend
e il ticket backend collegato, e ne permette il riuso da parte di `wm-webapp`. Il dettaglio della
feature è nell'overview di `wm-core`.

## Requisiti

- [ ] Nuovo file in `src/` con i tipi del progresso del cammino e della richiesta di
  certificazione, esportato da `src/index.ts`.
- [ ] Gli stati sono union di stringhe e coprono **solo ciò che la UI usa in questo ciclo**: tappa
  percorsa / in corso / non percorsa; richiesta assente / in attesa. Approvata e rifiutata si
  aggiungono con i ticket successivi, quando la UI le gestirà.
- [ ] I tipi coprono le tre chiamate: progresso del cammino, stato della richiesta
  (`GET /api/layer/{layer}/certification`) e invio (`POST`, stessa rotta).
- [ ] I tipi non hanno il prefisso `I`, come da convenzione del repo.
- [ ] `npm run build` compila.

## Rischi

- **Aggiunta che arriva a quattro consumer.** È solo un'aggiunta, quindi non rompe nessuno; ma se
  il backend reale cambierà la forma dei dati il tipo andrà modificato, e un tipo esportato si
  rimuove solo dopo che tutti i consumer hanno smesso di importarlo.

## Out of scope

- Chiavi nuove in `OPTIONS`: il massimo di foto è una costante in `wm-core`.

## Moduli toccati

- `src/passport.ts` — nuovo
- `src/index.ts` — export
