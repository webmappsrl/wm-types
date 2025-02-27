import {LineString} from 'geojson';
import {Location, WmFeature} from './feature';

export interface ISlopeChartStyle {
  backgroundColor: string;
}

export interface WmSlopeChartFlowLineQuote {
  flow_line_quote_orange: number;
  flow_line_quote_red: number;
  html: string;
}

export interface WmSlopeChartHoverElements {
  location: Location;
  track?: WmFeature<LineString>;
}
