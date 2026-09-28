/**
 * Contratto API del passaporto del camminatore (oc:8166).
 *
 * Il backend camminiditalia non esiste ancora: questi tipi descrivono il contratto ipotizzato
 * dal frontend e sono la base del ticket backend collegato. Coprono solo gli stati usati in
 * questo ciclo: approvazione e rifiuto arriveranno con i ticket successivi.
 */

/** Stato di una tappa (track del layer) per l'utente corrente. */
export type PassportStageStatus = 'completed' | 'in_progress' | 'not_started';

/** Una tappa del cammino con il suo stato di avanzamento. */
export interface PassportStage {
  trackId: number;
  name: string;
  status: PassportStageStatus;
  /** Data ISO 8601 del completamento, presente solo se `status === 'completed'`. */
  completedAt?: string;
  /** Percentuale 0-100, presente solo se `status === 'in_progress'`. */
  percent?: number;
}

/** Avanzamento di un cammino (layer) per l'utente corrente. */
export interface PassportProgress {
  layerId: number;
  totalStages: number;
  completedStages: number;
  /** Percentuale intera 0-100. */
  percent: number;
  stages: PassportStage[];
}

/** Stato della richiesta di certificazione: `none` = nessuna richiesta inviata. */
export type PassportCertificationStatus = 'none' | 'pending';

/** Risposta di `GET /api/layer/{layer}/certification` e di `POST` sulla stessa rotta. */
export interface PassportCertification {
  layerId: number;
  status: PassportCertificationStatus;
  /** Data ISO 8601 dell'invio, presente solo se `status === 'pending'`. */
  submittedAt?: string;
}

/** Corpo di `POST /api/layer/{layer}/certification`, inviato come multipart. */
export interface PassportCertificationRequest {
  layerId: number;
  /** Almeno un'immagine della credenziale cartacea (`images[]` nel multipart); il massimo lo fissa il frontend. */
  photos: Blob[];
  /** Seriale o altre informazioni identificative, opzionale (`notes` nel multipart). */
  notes?: string;
  /** Accettazione del disclaimer (`disclaimer_accepted` nel multipart). */
  disclaimerAccepted: true;
}
