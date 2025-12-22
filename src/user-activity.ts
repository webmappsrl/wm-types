/**
 * Type for result tab selection in home component
 * Can be 'tracks', 'pois', or null if no results available
 */
export type HomeResultTab = 'tracks' | 'pois' | null;

/**
 * Type for filter type (always has a value, never null)
 */
export type FilterType = 'tracks' | 'pois' | null;
