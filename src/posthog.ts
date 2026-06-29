import {Analytics} from './config';
import {Location} from './feature';
import {GeolocationMode} from './user-activity';

/**
 * Interfaccia UNICA usata dal tuo codice (posthog-js like)
 * - capture(event, props)
 * - identify(id, props)
 * - initAndRegister(props, options) - inizializza e registra le proprietà in un'unica chiamata
 * - reset()
 */
export interface WmPosthogClient {
  capture(event: string, props?: WmPosthogProps): void | Promise<void>;
  identify(distinctId: string, props?: WmPosthogProps): void | Promise<void>;
  initAndRegister(props: WmPosthogProps, options?: WmPosthogInitOptions): void | Promise<void>;
  reset(): void | Promise<void>;
}

export type WmPosthogInitOptions = Partial<Analytics>;

export interface WmPosthogConfig {
  apiKey: string;
  enabled: boolean;
  host: string;
}

export interface WmPosthogProps {
  // Context props — auto-injected by PosthogContextService on every event
  user_location?: Location;
  layer_id?: string;
  poi_id?: string;
  ugc_poi_id?: string;
  track_id?: string;
  ugc_track_id?: string;
  // Event-specific props
  filter_type?: string;
  filter_id?: string;
  filter_name?: string;
  slider_value?: string;
  tab?: string;
  content_type?: string;
  content_id?: string;
  query?: string;
  results_count?: number;
  layer_name?: string;
  layer_label?: string;
  mode?: GeolocationMode;
  // App-specific props
  appName?: string;
}
