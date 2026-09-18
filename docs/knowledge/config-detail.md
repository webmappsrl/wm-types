# Tipi dei box informativi (`config_detail`)

> Il meccanismo — accordion, apertura multipla, paginazione — vive in `wm-core`:
> `docs/knowledge/config-detail.md` di quel repo. Qui c'è solo ciò che riguarda i tipi.

## Come funziona oggi

I tipi condivisi sono `ConfigDetailBox`, `ConfigDetailInfoBox` e `ConfigDetailInfoBoxItem`, dichiarati in `src/config.ts` **senza prefisso `I`**. `title` e `content` sono localizzati con `Partial<Record<Language, string>>`.

`ConfigDetailToggleEvent`, introdotto in oc:8427 come payload di `CustomEvent('configDetailSettled')`, **non esiste più**: è stato rimosso in oc:8458 insieme al meccanismo che lo produceva.

## Perché così

- **I tipi condivisi vivono qui, non in `wm-core`** (oc:8181): sono la fonte di verità per chiunque li consumi, e sono stati spostati da `wm-core` proprio per questo.
- **`Partial<Record<Language, string>>` invece di `iLocalString` di `wm-core`** (oc:8181): stesso pattern già usato in `elastic.ts`, e non introduce una dipendenza verso un tipo che sta in un consumer.
- **Il namespace `box_type` resta distinto da `config_home`/`IBOX`** (oc:8181): non vanno unite le due union, nemmeno se in futuro comparisse una stringa uguale in entrambe.
- **Rimozione, non deprecazione** (oc:8458): un tipo senza consumer si rimuove, non si lascia come debito silenzioso — coerente con la policy già applicata in oc:8382.

## La trappola dell'ordine

Rimuovere un tipo esportato da qui **prima** che i consumer abbiano smesso di importarlo rompe la loro build TypeScript. L'obbligo sta in [.claude/rules/tipi-condivisi.md](../../.claude/rules/tipi-condivisi.md), che si carica quando si tocca `src/`.
