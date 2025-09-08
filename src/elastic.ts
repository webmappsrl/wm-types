import {Language} from './language';

export interface Elastic {
  [name: string]: any;
}

export interface Hit {
  cai_scale: string;
  distance: string;
  feature_image: string | any;
  id: number | string;
  layers: number[];
  name: string;
  properties: {[key: string]: any};
  ref: string;
  size?: any;
  taxonomyActivities: any;
  taxonomyWheres: string[];
  taxonomyIcons: TaxonomyIcons;
  start?: number[];
  end?: number[];
  distanceFromCurrentLocation?: number;
}

export interface TaxonomyIcons {
  [key: string]: {
    label: Partial<Record<Language, string>>;
    icon_name: string;
  };
}

export interface Bucket {
  key: string | number;
  doc_count: number;
}

export interface Count {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: Bucket[];
}

export interface AggregationDetail {
  doc_count: number;
  count: Count;
}

export interface Aggregations {
  themes: AggregationDetail;
  activities: AggregationDetail;
  layers: AggregationDetail;
}

export interface Response {
  aggregations: Aggregations;
  hits: Hit[];
}
