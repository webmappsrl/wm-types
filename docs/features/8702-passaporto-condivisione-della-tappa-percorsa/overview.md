> Ticket: oc:8702

# Passaporto: condivisione della tappa percorsa — parte `wm-types`

Documento d'insieme: `webmapp-app/docs/features/8702-passaporto-condivisione-della-tappa-percorsa/overview.md`.

## Cosa cambia

`PassportStage` acquista i dati tecnici della tappa che il backend aggiunge alla risposta di
`/api/layer/{layer}/progress`, usati dalla pagina della tappa, e il flag che dice se la tappa si può
condividere.

## Perché

La pagina della tappa deve mostrare foto e dislivelli; `ref`, partenza e arrivo servono ad allineare
pagina e immagine di condivisione; `shareable` decide se mostrare «Condividi» e permette al backend
di spegnerlo da remoto. Oggi `PassportStage` ha solo nome, stato, distanza, fonte, data e
percentuale.

## Requisiti

- [ ] Campi opzionali nuovi in `PassportStage`: `ref`, `from`, `to`, `ascent`, `descent`, `image`,
      `shareable`.
- [ ] Nessun campo esistente cambia nome o tipo.

## Rischi

- Nessun consumer esistente si rompe, perché i campi sono opzionali.
- **Ordine di rilascio:** `wm-types` va aggiornato prima di `wm-core` nei consumer.

## Out of scope

- Il tempo impiegato sulla tappa: arriverà con la validazione da GPS (oc:8165).

## Moduli toccati

- `src/passport.ts`
