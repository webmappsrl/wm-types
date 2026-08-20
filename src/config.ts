import {Language} from './language';

export interface ZoomFeaturesInViewport {
  minZoomFeaturesInViewport?: number;
  maxZoomFeaturesInViewport?: number;
}

export interface ICONS {
  [key: string]: string;
}

export interface APP {
  androidStore?: string;
  customerName?: string;
  forceToReleaseUpdate?: boolean;
  geohubId?: number;
  googlePlayUrl?: string;
  id?: string;
  iosStore?: string;
  sku?: string;
  name: string;
  myDownloads?: string;
  myPaths?: string;
  poi_acquisition_form?: any;
  track_acquisition_form?: any;
  welcome?: string;
  analytics: Analytics;
  minAppVersion?: string;
}

export interface WEBAPP {
  draw_poi_show: boolean;
  draw_track_show: boolean;
  editing_inline_show: boolean;
  splash_screen_show: boolean;
  analytics: Analytics;
}

export interface OPTIONS {
  addArrowsOverTracks: boolean;
  baseUrl: string;
  beBaseUrl?: string;
  caiScaleStyleZoom: number;
  clustering: CLUSTERING;
  customBackgroundImageUrl?: string;
  detailsMapBehaviour?: DETAILSMAPBEHAVIOUR;
  downloadFullGemoetryRouteIndex: boolean;
  downloadRoutesInWebapp: boolean;
  download_track_enable?: boolean;
  enableTrackAdoption: boolean;
  forceDefaultFeatureColor: boolean;
  forceWelcomePagePopup: boolean;
  galleryAnimationType?: string;
  hideDisclaimer: boolean;
  hideFilters: boolean;
  hideGlobalMap: boolean;
  hideNewsletterInSignup: boolean;
  hideSearch: boolean;
  highlightMapButton: boolean;
  highlightReadMoreButton: boolean;
  mapAttributions?: MAPATTRIBUTION[];
  maxFitZoom?: number;
  maxZoomFeaturesInViewport?: number;
  minDynamicOverlayLayersZoom: number;
  minZoomFeaturesInViewport?: number;
  passwordRecoveryUrl: string;
  poiIconRadius: number;
  poiIconZoom: number;
  poiLabelMinZoom: number;
  poiMaxRadius: number;
  poiMinRadius: number;
  poiMinZoom: number;
  poiSelectedRadius: number;
  print_track_enable?: boolean;
  privacyUrl: string;
  resetFiltersAtStartup: boolean;
  showAppDownloadButtons: APPDOWNLOADBUTTONS;
  showAscent: boolean;
  showDescent: boolean;
  showDifficultyLegend: boolean;
  showDistance: boolean;
  showDownloadTiles: boolean;
  showDurationBackward: boolean;
  showDurationForward: boolean;
  showEditLink: boolean;
  showEleFrom: boolean;
  showEleMax: boolean;
  showEleMin: boolean;
  showEleTo: boolean;
  showEmbeddedHtml: boolean;
  showFavorites?: boolean;
  showFeaturesInViewport: boolean;
  showGeojsonDownload: boolean;
  showGetDirections?: boolean;
  showGpxDownload: boolean;
  showHelp: boolean;
  showKmlDownload: boolean;
  showMapViewfinder: boolean;
  showMediaName: boolean;
  showPoiListOffline: boolean;
  showShapefileDownload: boolean;
  showTrackRefLabel: boolean;
  showTrackRemainingDistance?: boolean;
  showTravelMode?: boolean;
  show_searchbar?: boolean;
  skipRouteIndexDownload: boolean;
  startFiltersDisabled: boolean;
  startUrl: string;
  termsAndConditionsUrl?: string;
  trackAdoptionUrl?: string;
  trackReconnaissanceUrl?: string;
  trackRefLabelZoom: number;
  ugcTrackShareEnabled?: boolean;
  useCaiScaleStyle: boolean;
  useFeatureClassicSelectionStyle: boolean;
  voucherUrl?: string;
}

export interface CLUSTERING {
  enable: boolean;
  highZoom?: number;
  highZoomRadius: number;
  radius: number;
}

export type DETAILSMAPBEHAVIOUR = 'all' | 'track' | 'poi' | 'route';

export interface MAPATTRIBUTION {
  label?: string;
  url?: string;
}

export interface APPDOWNLOADBUTTONS {
  all: boolean;
  poi: boolean;
  route: boolean;
  track: boolean;
}

export interface Analytics {
  enabled: boolean;
  recordingEnabled: boolean;
  recordingProbability?: number;
}

/**
 * Un gruppo del builder generico `properties.config_detail` (Layer/EcTrack/EcPoi),
 * discriminato da `box_type`. Namespace di box_type concettualmente distinto da
 * `config_home` / IBOX in wm-core: non va unito a quella union anche se in futuro
 * potesse comparire una stringa uguale.
 */
export type ConfigDetailBox = ConfigDetailInfoBox;

export interface ConfigDetailInfoBox {
  box_type: 'info';
  items?: ConfigDetailInfoBoxItem[];
}

export interface ConfigDetailInfoBoxItem {
  title?: Partial<Record<Language, string>>;
  content?: Partial<Record<Language, string>>;
}
