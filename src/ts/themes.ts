/** Ids of the game themes; they match the `value` attributes of the theme radio buttons. */
export type GameThemeId = 'code-vibes' | 'gaming';

export const GAME_THEME_IDS: readonly GameThemeId[] = ['code-vibes', 'gaming'];

/**
 * Checks whether a value is a known game theme.
 * @param value - Value read from the URL or the page, or `null`.
 * @returns `true` if the value is a known theme id, otherwise `false`.
 */
export function isGameThemeId(value: string | null): value is GameThemeId {
  return GAME_THEME_IDS.some((themeId: GameThemeId): boolean => themeId === value);
}
