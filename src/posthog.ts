/**
 * Interfaccia UNICA usata dal tuo codice (posthog-js like)
 * - capture(event, props)
 * - identify(id, props)
 * - initAndRegister(props) - inizializza e registra le proprietà in un'unica chiamata
 * - reset()
 */
export interface WmPosthogClient {
  capture(event: string, props?: WmPosthogProps): void | Promise<void>;
  identify(distinctId: string, props?: WmPosthogProps): void | Promise<void>;
  initAndRegister(props: WmPosthogProps, enabled?: boolean): void | Promise<void>;
  reset(): void | Promise<void>;
}

export interface WmPosthogConfig {
  apiKey: string;
  enabled: boolean;
  host: string;
}

export type WmPosthogProps = Record<string, any>;
