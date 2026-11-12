import { cancelPendingTimers } from './game-flow';
import { getRequiredElement } from './dom-utils';
import { showView } from './view-navigation';

const EXIT_BUTTON_SELECTOR: string = '[data-exit-button]';
const EXIT_DIALOG_SELECTOR: string = '[data-exit-dialog]';
const BACK_BUTTON_SELECTOR: string = '[data-dialog-back]';
const CONFIRM_EXIT_BUTTON_SELECTOR: string = '[data-dialog-exit]';

/**
 * Returns the confirmation dialog.
 * @returns The dialog element.
 */
function getExitDialog(): HTMLDialogElement {
  return getRequiredElement<HTMLDialogElement>(EXIT_DIALOG_SELECTOR);
}

/** Opens the confirmation dialog as a modal. */
function openExitDialog(): void {
  getExitDialog().showModal();
}

/** Closes the confirmation dialog and keeps the game running. */
function closeExitDialog(): void {
  getExitDialog().close();
}

/** Stops the running game and returns to the home view. */
function quitGame(): void {
  closeExitDialog();
  cancelPendingTimers();
  showView('home');
}

/** Connects the exit button and the buttons of the confirmation dialog. */
export function initExitDialog(): void {
  getRequiredElement<HTMLButtonElement>(EXIT_BUTTON_SELECTOR).addEventListener('click', openExitDialog);
  getRequiredElement<HTMLButtonElement>(BACK_BUTTON_SELECTOR).addEventListener('click', closeExitDialog);
  getRequiredElement<HTMLButtonElement>(CONFIRM_EXIT_BUTTON_SELECTOR).addEventListener('click', quitGame);
}
