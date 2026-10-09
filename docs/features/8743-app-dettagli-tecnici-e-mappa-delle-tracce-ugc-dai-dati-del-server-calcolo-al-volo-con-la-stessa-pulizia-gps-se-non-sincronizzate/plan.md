> Ticket: oc:8743

# Piano — parte di wm-types

Il piano completo, con interfacce, test e ordine dei task, sta in wm-core:
`docs/features/8743-app-dettagli-tecnici-e-mappa-delle-tracce-ugc-dai-dati-del-server-calcolo-al-volo-con-la-stessa-pulizia-gps-se-non-sincronizzate/plan.md`. Qui solo i task che toccano questo repo.

- **Task 1** — tipo `UgcTrackStats` e campo opzionale `stats` in `LineStringProperties` (`src/feature.ts`). Commit: `feat(oc:8743): tipo stats delle tracce UGC`.
