> Ticket: oc:8159

# Notes — Tracciamento bacino di utenza per cammino — user_id in WmPosthogProps (wm-types)

## Deviazioni dal piano

Nessuna deviazione nell'implementazione: il campo `user_id?: number` è stato aggiunto esattamente come da `plan.md`.

Deviazione di processo (branch, non codice): il branch `feature/oc-8159-...` era stato inizialmente creato da uno stato `HEAD` detached su `feature/oc-8176-salva-cammino-nei-preferiti` (residuo di una sessione precedente). Su indicazione esplicita del developer, il branch è stato ricreato da `RDO_ass_cammini_italia_2026_2` aggiornato da origin (fast-forward), preservando via `git stash` la modifica non committata pre-esistente a `src/environment.ts`.

## Bug trovati

Nessuno in questo repo.

## Decisioni

- Nessuna logica applicativa in questo repo (coerente con lo scope di wm-types) — solo la definizione di tipo.
- `user_id: number` (non stringa), a differenza degli altri id di contesto (`layer_id`, `track_id`, ecc.) che sono stringificati lato wm-core — scelta deliberata per restare coerente con `IUser.id: number`, verificata come non-mismatch col consumer in review finale.

## Follow-up

- **`src/environment.ts` ha una modifica non committata e non correlata a questo ticket** (URL dello shard `local` per sviluppo locale) — esclusa esplicitamente dal commit di questa feature (`git add` mirato, mai `git add -A`). Resta responsabilità del developer deciderne la sorte in un secondo momento.
- `CLAUDE.md` del repo aggiornato con la riga "Feature disponibili" per oc:8159 in questo stesso ciclo (vedi Fase: update-context).
