import {Feature, GeoJsonObject, GeoJsonProperties, Geometry, LineString, Point} from 'geojson';

type GeometryProperties<G extends Geometry> = G extends Point
  ? PointProperties
  : G extends LineString
  ? LineStringProperties
  : G extends Media
  ? MediaProperties
  : never;
export type WmFeature<G extends Geometry> = Feature<G, GeometryProperties<G>>;

export interface LineStringProperties extends WmProperties {
  name: string;
}

export interface Media extends Point {}

export interface MediaProperties extends WmProperties {}

export interface PointProperties extends WmProperties {
  date: string;
  description: string;
  name: string;
  rawData: {
    displayPosition: any;
    nominatim?: {
      display_name: string;
    };
    photos: any[];
    uuid: string;
  };
}

export interface WmFeatureCollection<G extends Geometry = Geometry> {
  features: WmFeature<G>[];
  properties?: GeoJsonProperties;
  type: 'FeatureCollection';
}

export interface WmProperties {
  app_id: string;
  created_at: string;
  id: number;
  rawData: {
    uuid: string;
  };
  updated_at: string;

  [key: string]: any;
}

export interface responseDeleteMedia {
  success: 'media deleted';
}
