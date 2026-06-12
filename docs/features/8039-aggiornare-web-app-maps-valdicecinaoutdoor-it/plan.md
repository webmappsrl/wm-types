> Ticket: oc:8039

# Plan — Aggiornare web app maps.valdicecinaoutdoor.it

## Repo coinvolto
`wm-types` (`src/app/shared/wm-types`) — unica modifica di codice.

---

## Step 1 — Aggiungere il redirect in `src/environment.ts`

**File:** `src/environment.ts`
**Riga:** dopo l'ultima entry dell'oggetto `redirects` (attualmente `maps.sentierodeiducati.it` a riga ~199), prima della chiusura `};`

Aggiungere:

```typescript
'maps.valdicecinaoutdoor.it': {
  shardName: 'geohub',
  appId: 64,
},
```

Risultato atteso:

```typescript
  'maps.sentierodeiducati.it': {
    shardName: 'geohub',
    appId: 60,
  },
  'maps.valdicecinaoutdoor.it': {
    shardName: 'geohub',
    appId: 64,
  },
};
```

**Commit convention (a cura del developer):**
```
feat(oc:8039): add redirect for maps.valdicecinaoutdoor.it
```

---

## Step 2 — Allineamento submodule in wm-webapp (a cura del developer)

Dopo il commit in `wm-types`, aggiornare il puntatore SHA del submodule in `wm-webapp`:

```bash
# da wm-webapp/
cd src/app/shared/wm-types
git pull origin <branch>
cd ../../..
git add src/app/shared/wm-types
git commit -m "chore(oc:8039): align wm-types submodule"
```

> ⚠️ Se questo step viene omesso, il build di wm-webapp userà il vecchio SHA e il redirect non sarà presente.

---

## Note di sequenza

- Il redirect nel codice deve essere deployato **prima** che il virtualhost di `maps.valdicecinaoutdoor.it` punti alla nuova webapp. Se il virtualhost viene aggiornato prima del deploy, l'app riceve `NaN` come `appId` e va in errore.
