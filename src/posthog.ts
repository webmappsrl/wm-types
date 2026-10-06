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

/**
 * Modo in cui l'utente ha completato una condivisione, per la prop `share_method` di
 * `contentShared` (oc:8702): `native-share` foglio di sistema nativo, `web-share`
 * `navigator.share()` del browser, `download` file scaricato, `open-image` immagine aperta in una
 * nuova scheda (ripiego quando il file non si può scaricare).
 */
export type WmShareMethod = 'native-share' | 'web-share' | 'download' | 'open-image';

export interface WmPosthogProps {
  // Context props — auto-injected by PosthogContextService on every event
  user_location?: Location;
  layer_id?: string;
  poi_id?: string;
  ugc_poi_id?: string;
  track_id?: string;
  ugc_track_id?: string;
  /** Id dell'utente autenticato (IUser.id, wm-core), omesso se l'utente non è loggato. */
  user_id?: number;
  // Event-specific props
  filter_type?: string;
  filter_id?: string;
  filter_name?: string;
  slider_value?: string;
  tab?: string;
  content_type?: string;
  content_id?: string;
  /** Come si è completata la condivisione (`contentShared`, oc:8702). */
  share_method?: WmShareMethod;
  query?: string;
  results_count?: number;
  layer_name?: string;
  layer_label?: string;
  favorite?: boolean;
  mode?: GeolocationMode;
  // App-specific props
  appName?: string;
}
