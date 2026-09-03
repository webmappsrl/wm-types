> Ticket: oc:8458

# Notes — Accordion wm-config-detail: apertura multipla e rimozione scrollIntoView (wm-types)

## Deviazioni dal piano

Nessuna. Guardia dello Step 1 eseguita con successo (nessun consumer referenziava più `ConfigDetailToggleEvent` al momento della rimozione), tipo rimosso come da piano, build `ng build --configuration=camminiditalia` verificata con esito positivo (exit 0).

## Bug trovati

Nessuno.

## Decisioni

- Eseguita l'implementazione diretta (Read/Edit) invece di `superpowers:subagent-driven-development` — stesso motivo documentato nelle notes di wm-core (conflitto tra il meccanismo di commit-per-task della skill e il vincolo "nessun commit durante l'esecuzione").

## Follow-up

Nessuno.
