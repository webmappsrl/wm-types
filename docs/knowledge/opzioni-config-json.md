# I flag opzionali di `OPTIONS`

## Come funziona oggi

`OPTIONS` in `src/config.ts` raccoglie i flag che un backend può esporre nel proprio `config.json`. Sono **tutti opzionali**: restano `undefined` finché un backend non li valorizza, e il default client-side — quando esiste — vive in `wm-core` (`store/conf/conf.reducer.ts`), non qui.

| Flag | Ticket | Cosa gatea | Dove sta il perché |
|---|---|---|---|
| `showTrackRemainingDistance?: boolean` | oc:8177 | la card della distanza rimanente | `wm-core/docs/knowledge/profilo-altimetrico-e-distanza.md` |
| `ugcTrackShareEnabled?: boolean` | oc:8183 | il pulsante «Condividi» in `ugc-track-properties` | `wm-core/docs/knowledge/ugc.md` |
| `showFavorites?: boolean` | oc:8176 | il cuoricino preferiti sui layer | `wm-core/docs/knowledge/layer-box-e-home-layer.md` |

## Perché così

- **Un flag qui è solo una dichiarazione di tipo.** Cosa accenda e con quale default lo decide il consumer: questo repo non ha logica applicativa, e ripetere qui il comportamento creerebbe due versioni che divergono al primo cambio.
- **`showTrackRemainingDistance` copre solo la card** (oc:8177), non il marker di posizione né la barra «Pendenza» sul grafico, che restano sempre attivi — scelta esplicita del developer.
- **I nuovi campi si aggiungono in ordine alfabetico** (oc:8183), per non trasformare il diff di una riga in un conflitto.

## La trappola del nome

La chiave è `showFavorites`, **camelCase**, non `show_favorites`: in `OPTIONS` il nome non segue lo snake_case del backend. Sta in [.claude/rules/tipi-condivisi.md](../../.claude/rules/tipi-condivisi.md).
