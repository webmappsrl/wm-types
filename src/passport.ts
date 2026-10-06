import {Language} from './language';

/**
 * Contratto API del passaporto del camminatore (oc:8166, oc:8671, oc:8676).
 *
 * Descrive le risposte del backend camminiditalia: `GET /api/layer/{layer}/progress` per le tappe
 * riconosciute (oc:8676) e `/api/layer/{layer}/certification` per la richiesta di certificazione.
 * `in_progress` e `percent` servono alla validazione GPS di oc:8165, quando il backend manderà
 * valori di `progress` intermedi.
 */

/** Stato di una tappa (track del layer) per l'utente corrente. */
export type PassportStageStatus = 'completed' | 'in_progress' | 'not_started';

/** Origine della validazione di una tappa: credenziale cartacea o GPS (oc:8165). */
export type PassportStageSource = 'manual' | 'gps';

/** Una tappa del cammino con il suo stato di avanzamento. */
export interface PassportStage {
  trackId: number;
  /** Nome della tappa nelle lingue disponibili; può essere vuoto. */
  name: Partial<Record<Language, string>>;
  status: PassportStageStatus;
  /** Lunghezza della tappa in km; 0 se il dato manca. */
  distance: number;
  /** Origine della validazione, presente solo se `status === 'completed'`. */
  source?: PassportStageSource;
  /** Data ISO 8601 del completamento, presente solo se `status === 'completed'`. */
  completedAt?: string;
  /** Percentuale 0-100, presente solo se `status === 'in_progress'`. */
  percent?: number;
  /** Identificativo di riferimento della tappa. */
  ref?: string;
  /** Punto di partenza della tappa. */
  from?: string;
  /** Punto di arrivo della tappa. */
  to?: string;
  /** Dislivello positivo della tappa in metri. */
  ascent?: number;
  /** Dislivello negativo della tappa in metri. */
  descent?: number;
  /** URL della miniatura della tappa. */
  image?: string;
  /** Indica se la tappa è condivisibile. */
  shareable?: boolean;
}

/** Avanzamento di un cammino (layer) per l'utente corrente. */
export interface PassportProgress {
  layerId: number;
  totalStages: number;
  completedStages: number;
  /** Percentuale intera 0-100. */
  percent: number;
  /** Cammino completato secondo il backend: fa fede questo, non `percent`. */
  completed: boolean;
  stages: PassportStage[];
}

/**
 * Avanzamento di un cammino in `GET /api/passport` (oc:8701): elenca solo i cammini con almeno una
 * tappa validata dall'utente. Serve all'anello sulle card dei cammini.
 */
export interface PassportRoute {
  layerId: number;
  validated: number;
  total: number;
  /** Percentuale intera 0-100, calcolata dal backend. */
  percent: number;
  completed: boolean;
}

/**
 * Tappe validate dall'utente su tutti i cammini iniziati (oc:8701), per il chip sulle card delle
 * tappe.
 */
export interface PassportStageIndex {
  /** Data ISO 8601 della validazione, per `trackId`. */
  completedAt: Map<number, string>;
  /** Cammini iniziati la cui `/progress` non ha mai risposto: le loro tappe sono incerte. */
  pendingLayers: Set<number>;
}

/** Stato mostrato dal chip su una card di tappa (oc:8701). */
export type PassportStageChip =
  | {status: 'completed'; completedAt: string}
  | {status: 'not_started'};

/**
 * Stato dell'ultima richiesta di certificazione: `none` = nessuna richiesta inviata; `approved` e
 * `rejected` sono la decisione, definitiva, del gestore del cammino (oc:8671).
 */
export type PassportCertificationStatus = 'none' | 'pending' | 'approved' | 'rejected';

/** Risposta di `GET /api/layer/{layer}/certification` e di `POST` sulla stessa rotta. */
export interface PassportCertification {
  layerId: number;
  status: PassportCertificationStatus;
  /** Data ISO 8601 dell'invio, presente per ogni stato diverso da `none`. */
  submittedAt?: string;
  /** Data ISO 8601 della decisione del gestore, solo per `approved` e `rejected`. */
  decidedAt?: string;
  /** Nota del gestore, solo per `approved` e `rejected`, assente se non l'ha scritta. */
  decisionNote?: string;
}

/** Corpo di `POST /api/layer/{layer}/certification`, inviato come multipart. */
export interface PassportCertificationRequest {
  layerId: number;
  /** Almeno un'immagine della credenziale cartacea (`images[]` nel multipart); il massimo lo fissa il frontend. */
  photos: Blob[];
  /** Numero seriale della credenziale, opzionale: non tutti i cammini lo emettono (`serial_number` nel multipart). */
  serialNumber?: string;
  /** Accettazione del disclaimer (`disclaimer_accepted` nel multipart). */
  disclaimerAccepted: true;
}
