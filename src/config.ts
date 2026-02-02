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
  posthog: boolean;
}

export interface WEBAPP {
  draw_poi_show: boolean;
  draw_track_show: boolean;
  editing_inline_show: boolean;
  splash_screen_show: boolean;
  posthog: boolean;
}
