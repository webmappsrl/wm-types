> Ticket: oc:8676

# Passaporto camminatore: tappe percorse e validate dell'utente (backend e app)

## Cosa cambia

Il tipo `PassportStage` in `src/passport.ts` si allinea alla risposta reale di
`GET /api/layer/{layer}/progress` del backend camminiditalia:

- `name` diventa l'oggetto di traduzioni della tappa (`{it: "…", en: "…"}`, anche vuoto), al posto
  della stringa;
- si aggiungono `distance` (km, numero) e `source` (`'manual' | 'gps'`, presente solo per le tappe
  completate).

`PassportStageStatus` resta `'completed' | 'in_progress' | 'not_started'`, e resta anche `percent`:
`in_progress` e `percent` oggi non li produce nessuno e restano per la validazione GPS di oc:8165.
Il commento in testa al file, che dice che il backend non esiste ancora, si aggiorna.

## Perché

Il contratto è nato in oc:8166 come ipotesi del frontend, con il backend mockato. Ora il backend
esiste, e la pagina della tappa e la lista del dettaglio hanno bisogno di nome tradotto, distanza
e origine della validazione.

## Requisiti

- [ ] `PassportStage.name` è `Partial<Record<Language, string>>`, lo stesso tipo già usato per
      `title` in `src/config.ts:160`, non un tipo nuovo.
- [ ] `PassportStage` ha `distance: number` e `source?: PassportStageSource`, con
      `PassportStageSource = 'manual' | 'gps'`.
- [ ] `PassportProgress` ha `completed: boolean`, il completamento calcolato dal backend: il
      dettaglio lo legge da qui e non da `percent === 100`.
- [ ] Nessun campo esistente rinominato o rimosso.
- [ ] I tipi seguono la convenzione di wm-types, senza prefisso `I`.

## Rischi

- **wm-types è condiviso con la webapp.** Il cambio di tipo di `name` rompe solo chi lo usa come
  stringa: oggi è solo il dettaglio del passaporto in wm-core, che si aggiorna nello stesso ciclo.
- **`src/environment.ts` ha una modifica locale** (shard `local` verso il backend camminiditalia
  locale) che serve alla prova a mano e non va committata. Il commit aggiunge solo
  `src/passport.ts` e la cartella della documentazione, per nome.

## Out of scope

- I tipi di `GET /api/passport` (profilo, vista 5b).
- Badge e percentuali parziali di oc:8165.

## Moduli toccati

- `src/passport.ts`.
