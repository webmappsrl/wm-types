> Ticket: oc:8763

# Passaporto: attivazione per singolo cammino (flag sul layer) — tipi

Parte tipi. Backend in `camminiditalia`, app in `wm-core`: stesso slug sotto `docs/features/`.

## Cosa cambia

`PassportRoute` (`src/passport.ts`) non descrive più «un cammino con almeno una tappa
convalidata», ma «un cammino col passaporto acceso», anche con 0 tappe convalidate, e riceve
`validatedTracks`: la mappa id della tappa → data di convalida. In `PassportStageIndex`,
`pendingLayers` lascia il posto a `enabledLayers`.

## Perché

`GET /api/passport` diventa l'unica fonte con cui l'app sa su quali cammini mostrare il
passaporto (oc:8763, attivazione per singolo cammino) e da cui ricava i chip sulle tappe, data
compresa, senza chiamare `/progress` per ogni cammino. Con una sola risposta non esistono più
cammini «la cui lettura non ha ancora risposto», che è ciò che `pendingLayers` rappresentava.

## Requisiti

- [ ] `PassportRoute.validatedTracks: Record<number, string>` (data ISO 8601), obbligatorio.
- [ ] Commento di `PassportRoute` aggiornato al nuovo significato.
- [ ] `PassportStageIndex.pendingLayers` sostituito da `enabledLayers: Set<number>` (id dei cammini
  accesi, che il chip usa per decidere se mostrarsi), con il commento aggiornato. Prima della
  rimozione, `grep` sull'albero sorgente dei consumer: l'unico uso è in `wm-core`, aggiornato
  nello stesso lavoro.
- [ ] `npm run build` passa.

## Rischi

- Campo obbligatorio e campo rimosso: `wm-core` va aggiornato insieme, altrimenti la sua build
  TypeScript fallisce. I consumer che usano il passaporto sono solo in `wm-core`; i due submodule
  vanno aggiornati insieme nel prodotto.

## Out of scope

- Tipi per `name` e i km della risposta, che l'app non usa.

## Moduli toccati

**wm-types**
- `src/passport.ts`
