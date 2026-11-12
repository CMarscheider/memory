/** Names of the three setting groups; they match the `name` attributes of the radio buttons. */
export const GAME_THEME_SETTING: string = 'game-theme';
export const PLAYER_SETTING: string = 'player';
export const BOARD_SIZE_SETTING: string = 'board-size';
export const SETTING_NAMES: readonly string[] = [GAME_THEME_SETTING, PLAYER_SETTING, BOARD_SIZE_SETTING];
const RADIO_BUTTON_SELECTOR: string = 'input[type="radio"]';

/**
 * Returns the chosen radio button of a setting group.
 * @param settingName - Name of the group, e.g. `game-theme`.
 * @returns The chosen radio button, or `null` if nothing is chosen yet.
 */
export function findChosenOption(settingName: string): HTMLInputElement | null {
  return document.querySelector<HTMLInputElement>(`input[name="${settingName}"]:checked`);
}

/**
 * Checks whether every setting group has a chosen option.
 * @returns `true` if all settings are chosen, otherwise `false`.
 */
export function areAllSettingsChosen(): boolean {
  return SETTING_NAMES.every((settingName: string): boolean => findChosenOption(settingName) !== null);
}

/**
 * Calls the handler whenever any radio button of the settings changes.
 * @param handleChange - Function to run after each change.
 */
export function listenToSettingChanges(handleChange: () => void): void {
  const radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>(RADIO_BUTTON_SELECTOR);

  radioButtons.forEach((radioButton: HTMLInputElement): void => {
    radioButton.addEventListener('change', handleChange);
  });
}
