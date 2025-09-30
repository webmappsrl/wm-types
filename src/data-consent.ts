/**
 * Data Consent Types
 *
 * Interfacce per la gestione del consenso al trattamento dei dati
 * secondo il GDPR e le normative sulla privacy.
 */

/**
 * Rappresenta un singolo periodo di consenso
 */
export interface ConsentPeriod {
  /** ID dell'applicazione */
  app_id: string;
  /** Stato del consenso (true = accettato, false = rifiutato) */
  consent: boolean;
  /** Data e ora del consenso in formato ISO */
  consent_date: string;
  /** ID dell'utente */
  user_id: number;
}

/**
 * Storia completa del consenso per un'applicazione
 */
export interface ConsentHistory {
  /** Array cronologico di tutti i periodi di consenso */
  consent_history: ConsentPeriod[];
  /** Ultimo consenso dato */
  latest_consent: ConsentPeriod | null;
}

/**
 * Risposta API per il consenso dati
 */
export interface DataConsentResponse {
  /** Indica se l'utente ha dato il consenso */
  has_consent: boolean;
  /** Ultimo consenso dato */
  latest_consent: ConsentPeriod | null;
  /** Storia completa del consenso */
  consent_history: ConsentPeriod[];
}

/**
 * Informazioni del consenso dati (formato API)
 */
export interface DataConsentInfo {
  /** Indica se l'utente ha dato il consenso */
  has_consent: boolean;
  /** Ultimo consenso dato */
  latest_consent: ConsentPeriod | null;
  /** Storia completa del consenso */
  consent_history: ConsentPeriod[];
}

/**
 * Risposta completa dell'API per il consenso
 */
export interface DataConsentApiResponse {
  /** Informazioni del consenso dati */
  data_consent_info: DataConsentInfo;
}
