import { PlayerId, isPlayerId } from './players';
import { BOARD_SIZE_SETTING, GAME_THEME_SETTING, PLAYER_SETTING, findChosenOption } from './settings-utils';
import { GameThemeId, isGameThemeId } from './themes';

export interface ChosenSettings {
  gameTheme: GameThemeId;
  player: PlayerId;
  boardSize: string;
}

let storedSettings: ChosenSettings | null = null;

/**
 * Returns the value of the chosen option of a setting group.
 * @param settingName - Name of the group.
 * @returns The value, or `null` if nothing is chosen yet.
 */
function readChosenValue(settingName: string): string | null {
  return findChosenOption(settingName)?.value ?? null;
}

/**
 * Reads the three choices from the settings page.
 * @returns The chosen settings, or `null` if a choice is missing or invalid.
 */
export function readChosenSettings(): ChosenSettings | null {
  const gameTheme: string | null = readChosenValue(GAME_THEME_SETTING);
  const player: string | null = readChosenValue(PLAYER_SETTING);
  const boardSize: string | null = readChosenValue(BOARD_SIZE_SETTING);

  if (!isGameThemeId(gameTheme) || !isPlayerId(player) || boardSize === null) {
    return null;
  }
  return { gameTheme, player, boardSize };
}

/**
 * Keeps the settings so that the game view can read them.
 * @param settings - The settings of the game that is about to start.
 */
export function storeChosenSettings(settings: ChosenSettings): void {
  storedSettings = settings;
}

/**
 * Returns the stored settings.
 * @returns The stored settings, or `null` if the game has not been started.
 */
export function getStoredSettings(): ChosenSettings | null {
  return storedSettings;
}
