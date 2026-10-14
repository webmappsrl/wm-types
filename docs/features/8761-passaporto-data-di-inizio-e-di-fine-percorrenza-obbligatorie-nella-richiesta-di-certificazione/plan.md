> Ticket: oc:8761

# Date di percorrenza nella richiesta di certificazione — piano wm-types

> **Per chi esegue:** usare superpowers:executing-plans o superpowers:subagent-driven-development.
> I commit sono istruzioni per il dev: non si eseguono senza il suo via libera esplicito.

**Obiettivo:** `PassportCertificationRequest` riceve `startDate` ed `endDate` obbligatori.

**Spec:** [overview.md](overview.md). Il resto del lavoro è nei piani gemelli di wm-core e del
backend camminiditalia, con lo stesso slug.

## Vincoli globali

- Nessuna logica in wm-types: solo il tipo e il JSDoc.
- I tipi non hanno il prefisso `I`.
- Branch `feature/oc-8761-passaporto-data-di-inizio-e-di-fine-percorrenza-obbligatorie-nella-richiesta-di-certificazione`
  da `Passaporto`, PR verso `Passaporto`.
- Il bump di wm-types nella root va nello stesso commit del bump di wm-core (vedi il piano di
  wm-core, Task 6).

---

### Task 1: due campi in `PassportCertificationRequest`

**File:**
- Modifica: `src/passport.ts:110-118`

**Interfacce:**
- Produce: `PassportCertificationRequest.startDate: string`, `PassportCertificationRequest.endDate: string`
  (formato `AAAA-MM-GG`), usati da wm-core nel Task 2 e nel Task 4 del suo piano.

- [ ] **Passo 1:** dopo `serialNumber?`, aggiungi `startDate: string` ed `endDate: string`, ciascuno
      con un JSDoc sullo stile dei campi vicini: «Data in cui il camminatore ha iniziato (finito)
      il cammino, `AAAA-MM-GG`, data locale (`start_date` / `end_date` nel multipart).»
- [ ] **Passo 2:** `npm run build` nella cartella di wm-types. Atteso: nessun errore.
- [ ] **Passo 3 (istruzione per il dev):**

```bash
git add src/passport.ts docs/features/8761-*/
git commit -m "feat(oc:8761): date di percorrenza nella richiesta di certificazione"
```
