import { ChosenSettings, getStoredSettings } from './chosen-settings';
import { renderBoard } from './board';
import { preloadCardFaces } from './deck';
import { renderScoreboard } from './game-header';
import { cancelPendingTimers, handleCardSelected } from './game-flow';
import { startGameState } from './game-state';
import { applyThemeImages } from './theme-assets';

/**
 * Applies the theme of the chosen settings to the page: colours and images.
 * @param settings - The settings of the started game.
 */
function applyTheme(settings: ChosenSettings): void {
  document.body.dataset.theme = settings.gameTheme;
  applyThemeImages(settings.gameTheme);
  preloadCardFaces(settings.gameTheme);
}

/** Renders the game view with the stored settings and starts a new game. */
export function renderGame(): void {
  const settings: ChosenSettings | null = getStoredSettings();

  if (settings !== null) {
    cancelPendingTimers();
    startGameState(settings);
    applyTheme(settings);
    renderScoreboard();
    renderBoard(settings.boardSize, handleCardSelected);
  }
}
