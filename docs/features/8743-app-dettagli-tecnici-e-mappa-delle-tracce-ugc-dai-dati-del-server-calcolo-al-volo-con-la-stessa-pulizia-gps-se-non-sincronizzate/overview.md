> Ticket: oc:8743

# App: dettagli tecnici e mappa delle tracce UGC dai dati del server, calcolo al volo con la stessa pulizia GPS se non sincronizzate

## Cosa cambia

Le tracce UGC scaricate dal server portano `properties.stats` (oc:8742), con i dati tecnici
calcolati dal backend. Il tipo `LineStringProperties` in `src/feature.ts` acquista il campo
opzionale `stats`, con le chiavi della specifica di wm-package
(`docs/knowledge/dati-tecnici-delle-tracce-ugc.md`, branch `develop`, §1).

Il quadro completo sta nell'overview di wm-core, cantiere con lo stesso slug.

## Perché

wm-core legge `stats` per mostrare i dati tecnici e calcola un oggetto con la stessa forma quando
la traccia non è sincronizzata: il tipo condiviso evita che le due parti divergano.

## Requisiti

- [ ] `stats` è opzionale in `LineStringProperties` (le tracce senza `locations` non lo hanno).
- [ ] Chiavi: `distance` (number), `duration`, `duration_moving`, `avg_speed`, `max_speed`
      (number | null), `ascent`, `descent`, `ele_min`, `ele_max`, `ele_from`, `ele_to`
      (number | null), `computed_at` (string). Unità nei commenti.
- [ ] Convenzione di wm-types sui nomi (nessun prefisso `I`).

## Rischi

- Il branch corrente di wm-types ha modifiche locali non committate (`.gitignore`,
  `src/environment.ts`) che non fanno parte di questo ticket e non vanno incluse.

## Out of scope

- Tipi dei parametri di `config.json`: stanno in `wm-core/types/config.ts`.

## Moduli toccati

- `src/feature.ts`
