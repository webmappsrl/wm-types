> Ticket: oc:8427

# Note — deviazione dal piano

Il tipo `ConfigDetailToggleEvent` (`src/config.ts`) è stato aggiunto come da piano — shape invariata (`{opening: boolean; headerElement: HTMLElement | null}`), nessun prefisso `I`.

**Unica deviazione**: il JSDoc descrive ora il tipo come il `detail` di un `CustomEvent('configDetailSettled')` nativo dispacciato da `wm-config-detail`, non più il payload di un `@Output()` Angular come previsto dal piano originale — `wm-core` è passato in corso d'opera a un evento DOM nativo con bubbling per evitare pass-through nei componenti intermedi (`wm-home-layer`/`wm-track-properties`/`wm-poi-properties`). Lo shape del tipo condiviso non è cambiato, solo il meccanismo di trasporto — nessun impatto sui consumer che lo importano già tipizzato (`wm-core`, `webmapp-app`).

Dettagli completi del redesign: vedi `notes.md` in `wm-core` e nel repo principale.
