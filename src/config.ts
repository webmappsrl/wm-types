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

/**
 * Payload (`detail`) del `CustomEvent('configDetailSettled')` dispacciato da `ConfigDetailComponent`
 * (wm-core) dal proprio host DOM, con `bubbles: true` — non un `@Output()` Angular, per
 * attraversare i confini di content projection senza che i componenti intermedi (`wm-home-layer`,
 * `wm-track-properties`, `wm-poi-properties`) debbano fare pass-through (oc:8427).
 *
 * Dispacciato SOLO dopo che il layout è ritenuto assestato (debounce breve dopo l'ultima
 * `transitionend` pertinente sul proprio sottoalbero, con fallback a timeout se non arriva mai —
 * vedi `ConfigDetailComponent` per i dettagli), non sincrono al click. Nessuno scroll/resize viene
 * eseguito dal componente stesso: solo il consumer (che conosce il proprio contesto di montaggio,
 * es. presenza di un pannello ridimensionabile) decide se e quando spostare la vista.
 */
export interface ConfigDetailToggleEvent {
  /** `true` se l'item è stato appena aperto, `false` se è stato chiuso. */
  opening: boolean;
  /** Elemento header (`<button>`) dell'item appena aperto, per un eventuale `scrollIntoView` del consumer. `null` in chiusura. */
  headerElement: HTMLElement | null;
}

/** Forma del percorso (oc:8180, calcolata dal backend sulla geometria delle tappe). */
export const ROUTE_SHAPES = ['roundtrip', 'linear', 'discontinuous'] as const;
export type RouteShape = (typeof ROUTE_SHAPES)[number];

/** Portata della rete escursionistica — vocabolario OSM del tag `network`. */
export const WALKING_NETWORKS = ['lwn', 'rwn', 'nwn', 'iwn'] as const;
export type WalkingNetwork = (typeof WALKING_NETWORKS)[number];

/** Stagioni in cui il cammino è preferibilmente percorribile. */
export const SEASONS = ['spring', 'summer', 'autumn', 'winter'] as const;
export type Season = (typeof SEASONS)[number];

/**
 * Valore di un attributo filtrabile: il codice stabile più le sue traduzioni. Il backend
 * fornisce sempre entrambi — il frontend non deve tradurre i codici né conoscere gli enum
 * del backend per mostrare le label.
 */
export interface LayerAttributeValue<T extends string = string> {
  value: T;
  name: Partial<Record<Language, string>>;
}

/**
 * Caratteristiche di un cammino usate dai filtri Home (oc:8180, wm-package/camminiditalia).
 * Ogni chiave è opzionale: assente significa "dato non disponibile", non zero/vuoto.
 */
export interface LayerAttributes {
  /** Lunghezza totale in km — somma delle distanze delle tappe. */
  distance?: number;
  /** Numero di tappe del cammino. */
  stage_count?: number;
  /** Forma del percorso. */
  shape?: LayerAttributeValue<RouteShape>;
  /** Regioni attraversate (solo regioni, mai comuni). */
  taxonomy_where?: LayerAttributeValue[];
  /** Temi associati — vocabolario aperto, gestito dal cliente in backoffice. */
  themes?: LayerAttributeValue[];
  /** Portata della rete escursionistica. */
  walking_network?: LayerAttributeValue<WalkingNetwork>;
  /** Stagioni consigliate. */
  season?: LayerAttributeValue<Season>[];
}

/** Una voce selezionabile in un filtro Home (oc:8414): codice stabile, etichetta risolta per la lingua attiva, numero di cammini che la soddisfano. */
export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

/** Un bucket a soglia fissa per un filtro numerico Home (Lunghezza/Tappe, oc:8414). `max: null` = nessun limite superiore. */
export interface NumericBucket {
  id: string;
  min: number;
  max: number | null;
  /** Chiave i18n dell'unità di misura mostrata accanto al numero (es. 'tappe', 'km'). */
  unitKey: string;
}

/** Stato corrente dei 7 filtri Home "Cerca il tuo cammino" (oc:8414). Ogni chiave assente/vuota = filtro non attivo. */
export interface RouteFilterState {
  distance?: string[];
  stageCount?: string[];
  shape?: RouteShape[];
  walkingNetwork?: WalkingNetwork[];
  regions?: string[];
  themes?: string[];
  seasons?: Season[];
}

export type RouteFilterKey = keyof RouteFilterState;
