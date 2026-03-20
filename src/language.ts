export const LANGUAGES = ['it', 'en', 'fr', 'de', 'es', 'pr', 'sq'] as const;
export type Language = (typeof LANGUAGES)[number];
export type WmTranslations = Partial<Record<Language, object>>;
