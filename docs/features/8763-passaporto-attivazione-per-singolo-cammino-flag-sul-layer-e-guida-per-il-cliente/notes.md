> Ticket: oc:8763

# Notes — Passaporto: attivazione per singolo cammino — tipi

## Deviazioni dal piano

Nessuna. Rispetto all'overview iniziale, `pendingLayers` non è stato solo rimosso ma sostituito da
`enabledLayers`, deciso in fase di piano e allineato nell'overview.

## Bug trovati

Nessuno.

## Decisioni

- `validatedTracks: Record<number, string>`: le chiavi arrivano da JSON come stringhe e `wm-core` le
  converte con `Number()`.
- `.gitignore` e `src/environment.ts` hanno modifiche locali precedenti al ticket: non fanno parte
  di questo lavoro e non vanno committate con oc:8763.

## Follow-up

- I submodule `wm-types` e `wm-core` vanno aggiornati insieme nei prodotti: da soli non compilano.
