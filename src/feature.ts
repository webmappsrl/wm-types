import {Feature, GeoJsonProperties, Geometry, LineString, Point} from 'geojson';
import  {GalleryPhoto, Photo} from '@capacitor/camera';

type GeometryProperties<G extends Geometry> = G extends Point
  ? PointProperties
  : G extends LineString
  ? LineStringProperties
  : G extends Media
  ? MediaProperties
  : never;
export type WmFeature<G extends Geometry,P = GeoJsonProperties> = Feature<G, P | GeometryProperties<G>>;

export interface LineStringProperties extends WmProperties {
  name: string;
}

export interface Media extends Point {}

export interface MediaProperties extends WmProperties {
  photo:Photo|GalleryPhoto
}

export interface PointProperties extends WmProperties {
  date: string;
  description: string;
  name:string
  nominatim?: {
    display_name: string;
  };
  photos: Photo[];
  type: 'waypoint';
  uuid: string;
}

export interface WmFeatureCollection<G extends Geometry = Geometry> {
  features: WmFeature<G>[];
  properties?: GeoJsonProperties;
  type: 'FeatureCollection';
}

export interface WmProperties {
  appVersion:string;
  app_id: string;
  form?:{[key: string]: any}

  id?: number;

  [key: string]: any;
}

export interface responseDeleteMedia {
  success: 'media deleted';
}
