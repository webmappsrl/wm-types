import {Feature, GeoJsonProperties, Geometry, LineString, Point} from 'geojson';
import {GalleryPhoto, Photo} from '@capacitor/camera';
import {DeviceInfo} from '@capacitor/device';

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

  [key: string]: any;
}

export interface responseDeleteMedia {
  success: 'media deleted';
}

export interface LayerFeatureCount {
  tracks: number;
  pois: number;
}
export type LayerId = string;
export type LayerFeaturesCount = Record<LayerId, LayerFeatureCount>;
