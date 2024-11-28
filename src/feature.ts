import {Feature, GeoJsonProperties, Geometry, LineString, Point} from 'geojson';
import  {GalleryPhoto, Photo} from '@capacitor/camera';
import {DeviceInfo} from '@capacitor/device';

type GeometryProperties<G extends Geometry> = G extends Point
  ? PointProperties
  : G extends LineString
  ? LineStringProperties
  : G extends Media
  ? MediaProperties
  : never;
export type WmFeature<G extends Geometry,P = GeoJsonProperties> = Feature<G, P | GeometryProperties<G>>;

export interface LineStringProperties extends WmProperties {
  distanceFilter: number;
  locations: Location[];
  name: string;
  photos: Photo[];
}

export interface Location {
  accuracy: number;
  altitude?: number ;
  altitudeAccuracy: number ;
  bearing? : number;
  latitude: number;
  longitude: number;
  simulated: boolean;
  speed?: number;
  time?: number;
}

export interface Media extends Point {}

export interface MediaProperties extends WmProperties {
  photo:Photo|GalleryPhoto
}

export interface PointProperties extends WmProperties {
  description: string;
  name:string
  nominatim?: {
    display_name: string;
  };
  photos: Photo[];
  position: Location;
  type: 'waypoint';
}

export interface WmDeviceInfo extends DeviceInfo {
  appVersion: string;
}

export interface WmFeatureCollection<G extends Geometry = Geometry,P = GeoJsonProperties> {
  features: WmFeature<G,P>[];
  properties?: GeoJsonProperties;
  type: 'FeatureCollection';
}

export interface WmProperties {
  app_id: string;
  device: WmDeviceInfo;
  form?:{[key: string]: any}

  id?: number;
  uuid: string;

  [key: string]: any;
}

export interface responseDeleteMedia {
  success: 'media deleted';
}
