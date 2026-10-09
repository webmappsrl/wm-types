import {Feature, GeoJsonProperties, Geometry, LineString, Point} from 'geojson';
import {GalleryPhoto, Photo} from '@capacitor/camera';
import {DeviceInfo} from '@capacitor/device';
import {Language} from './language';

type GeometryProperties<G extends Geometry> = G extends Point
  ? PointProperties
  : G extends LineString
  ? LineStringProperties
  : never;
export type WmFeature<G extends Geometry, P = GeoJsonProperties> = Feature<
  G,
  P | GeometryProperties<G>
>;

export interface Media extends Photo {
  id?: number;
  name?: string;
  description?: string;
}

export interface LineStringProperties extends WmProperties {
  distanceFilter: number;
  locations: Location[];
  name: string;
  media: Media[];
  /** Dati tecnici calcolati dal server (oc:8742); assente sulle tracce senza `locations`. */
  stats?: UgcTrackStats;
}

/**
 * Dati tecnici di una traccia UGC, scritti solo dal server. Un valore non calcolabile è `null`,
 * mai `0`. Specifica: wm-package, `docs/knowledge/dati-tecnici-delle-tracce-ugc.md`.
 */
export interface UgcTrackStats {
  /** km, 2 decimali */
  distance: number;
  /** minuti interi, dal primo all'ultimo punto tenuto */
  duration: number | null;
  /** minuti interi, solo i tratti in movimento */
  duration_moving: number | null;
  /** km/h, 1 decimale */
  avg_speed: number | null;
  /** km/h, 1 decimale */
  max_speed: number | null;
  /** m, dal DEM: `null` finché il job DEM non ha girato */
  ascent: number | null;
  /** m, dal DEM */
  descent: number | null;
  /** m s.l.m., dal DEM */
  ele_min: number | null;
  /** m s.l.m., dal DEM */
  ele_max: number | null;
  /** m s.l.m., dal DEM */
  ele_from: number | null;
  /** m s.l.m., dal DEM */
  ele_to: number | null;
  /** data e ora UTC, ISO 8601 al secondo */
  computed_at: string;
}

export interface Location {
  accuracy?: number;
  altitude?: number;
  altitudeAccuracy?: number;
  bearing?: number;
  latitude: number;
  longitude: number;
  simulated?: boolean;
  speed?: number;
  time?: number;
}

export interface PointProperties extends WmProperties {
  description: string;
  name: string;
  nominatim?: {
    display_name: string;
  };
  media: Media[];
  position: Location;
  type: 'waypoint';
}

export interface WmDeviceInfo extends DeviceInfo {
  appVersion: string;
}

export interface WmFeatureCollection<G extends Geometry = Geometry, P = GeoJsonProperties> {
  features: WmFeature<G, P>[];
  properties?: GeoJsonProperties;
  type: 'FeatureCollection';
}

export interface WmProperties {
  app_id: string;
  createdAt?: Date;
  device: WmDeviceInfo;
  form?: {[key: string]: any};

  id?: number;
  updatedAt?: Date;
  uuid: string;

  /**
   * Mappa delle "where" tassonomiche.
   * Esempio payload (una sola entry):
   * `{ "R47250": { de: "Bladen", it: "Sappada", _admin_level: 8 } }`
   */
  taxonomy_where?: TaxonomyWhereMap;

  [key: string]: any;
}

export type TaxonomyWhereEntry = {_admin_level: number} & Partial<Record<Language, string | number>>;

export type TaxonomyWhereMap = Record<string, TaxonomyWhereEntry>;

export interface responseDeleteMedia {
  success: 'media deleted';
}

export interface LayerFeatureCount {
  tracks: number;
  pois: number;
}
export type LayerId = string;
export type LayerFeaturesCount = Record<LayerId, LayerFeatureCount>;

export type SyncUgcTypes = 'poi' | 'track' | null;