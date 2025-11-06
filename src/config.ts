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
  poi_acquisition_form?: any;
  track_acquisition_form?: any;
  welcome?: string;
}
