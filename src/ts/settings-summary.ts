import { ChosenSettings, readChosenSettings, storeChosenSettings } from './chosen-settings';
import { getRequiredElement } from './dom-utils';
import { renderGame } from './game-page';
import { areAllSettingsChosen, findChosenOption, listenToSettingChanges } from './settings-utils';
import { showView } from './view-navigation';

const SUMMARY_ITEM_SELECTOR: string = '[data-summary]';
const START_BUTTON_SELECTOR: string = '#start-button';
const EMPTY_CLASS: string = 'is-empty';

/**
 * Returns the visible text of the chosen option of a setting group.
 * @param settingName - Name of the group.
 * @returns The option text, or `null` if nothing is chosen yet.
 */
function findChosenOptionText(settingName: string): string | null {
  const chosenLabel: HTMLLabelElement | undefined = findChosenOption(settingName)?.labels?.[0];
  return chosenLabel?.textContent?.trim() ?? null;
}

/**
 * Shows the chosen option in one summary item, or its placeholder if nothing is chosen.
 * @param summaryItem - The summary element of one setting.
 */
function refreshSummaryItem(summaryItem: HTMLElement): void {
  const settingName: string = summaryItem.dataset.summary ?? '';
  const chosenText: string | null = findChosenOptionText(settingName);
  const isChosen: boolean = chosenText !== null;

  summaryItem.textContent = chosenText ?? summaryItem.dataset.placeholder ?? '';
  summaryItem.classList.toggle(EMPTY_CLASS, !isChosen);
}

/** Shows the chosen option of every setting in the selection bar. */
function refreshSummary(): void {
  document.querySelectorAll<HTMLElement>(SUMMARY_ITEM_SELECTOR).forEach(refreshSummaryItem);
}

/** Enables the start button only when every setting is chosen. */
function refreshStartButton(): void {
  const startButton: HTMLButtonElement = getRequiredElement<HTMLButtonElement>(START_BUTTON_SELECTOR);
  startButton.disabled = !areAllSettingsChosen();
}

/** Updates the summary and the start button after every change. */
function refreshSelectionBar(): void {
  refreshSummary();
  refreshStartButton();
}

/**
 * Stores the chosen settings, renders the game view and shows it.
 * @param settings - The settings chosen on the settings page.
 */
function openGame(settings: ChosenSettings): void {
  storeChosenSettings(settings);
  renderGame();
  showView('game');
}

/** Starts the game with the current choices, if all of them are made. */
function startGame(): void {
  const settings: ChosenSettings | null = readChosenSettings();

  if (settings !== null) {
    openGame(settings);
  }
}

/** Keeps the selection bar up to date, connects the start button and shows the initial state. */
export function initSettingsSummary(): void {
  getRequiredElement<HTMLButtonElement>(START_BUTTON_SELECTOR).addEventListener('click', startGame);
  listenToSettingChanges(refreshSelectionBar);
  refreshSelectionBar();
}
