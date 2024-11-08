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
  date: string;
  description: string;
  name:string
  nominatim?: {
    display_name: string;
  };
  photos: Photo[];
  position: Location;
  type: 'waypoint';
  uuid: string;
}

export interface WmFeatureCollection<G extends Geometry = Geometry,P = GeoJsonProperties> {
  features: WmFeature<G,P>[];
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
