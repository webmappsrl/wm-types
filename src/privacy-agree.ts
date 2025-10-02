/**
 * Privacy agree information interface
 */
export interface PrivacyAgreeInfo {
  has_agree: boolean;
  latest_agree?: PrivacyAgreeEntry;
  agree_history?: PrivacyAgreeEntry[];
}

/**
 * Privacy agree entry interface
 */
export interface PrivacyAgreeEntry {
  agree: boolean;
  date: string;
  app_id: number;
  user_id: number;
}

/**
 * Privacy agree history interface
 */
export interface PrivacyAgreeHistory {
  latest_agree?: PrivacyAgreeEntry;
  agree_history: PrivacyAgreeEntry[];
}

/**
 * User response interface for privacy agree
 */
export interface UserPrivacyAgreeResponse {
  privacy_agree_info: PrivacyAgreeInfo;
}
