import { LineString } from 'geojson';
import { Location, WmFeature } from './feature';

export interface ISlopeChartStyle {
  backgroundColor: string;
}

export interface WmSlopeChartHoverElements {
  location: Location;
  track?: WmFeature<LineString>;
}
