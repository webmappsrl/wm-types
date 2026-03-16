export type WmUpdateType = 'none' | 'patch' | 'minor' | 'major';

export interface WmUpdateEvaluation {
  type: WmUpdateType;
  currentVersion: string | null;
  minVersion: string | null;
  storeVersion: string | null;
}

export interface WmStorePlatformInfo {
  version: string;
  release_notes?: string;
  store_url?: string;
}

export interface WmStoreVersionResponse {
  ios?: WmStorePlatformInfo;
  android?: WmStorePlatformInfo;
}
