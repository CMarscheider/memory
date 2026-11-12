import { getRequiredElement } from './dom-utils';
import { getCurrentPlayer, getScores } from './game-state';
import { PLAYER_IDS, PlayerId } from './players';

const CURRENT_PLAYER_BADGE_SELECTOR: string = '[data-current-player-badge]';

/**
 * Returns the badge image of a player in the header.
 * @param player - Id of the player.
 * @returns The badge image.
 */
function getPlayerBadge(player: PlayerId): HTMLImageElement {
  return getRequiredElement<HTMLImageElement>(`[data-player="${player}"] .player-score__badge`);
}

/** Shows the badge of the player whose turn it is. */
function showCurrentPlayer(): void {
  const currentBadge: HTMLImageElement = getRequiredElement<HTMLImageElement>(CURRENT_PLAYER_BADGE_SELECTOR);
  currentBadge.src = getPlayerBadge(getCurrentPlayer()).src;
}

/**
 * Shows the points of a player wherever they appear: in the header and on the game over view.
 * @param player - Id of the player.
 */
function showPlayerPoints(player: PlayerId): void {
  const pointsText: string = String(getScores()[player]);
  const pointsElements: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>(`[data-player="${player}"] .player-score__points`);

  pointsElements.forEach((pointsElement: HTMLElement): void => {
    pointsElement.textContent = pointsText;
  });
}

/** Shows the points of both players and the player whose turn it is. */
export function renderScoreboard(): void {
  showCurrentPlayer();
  PLAYER_IDS.forEach((player: PlayerId): void => showPlayerPoints(player));
}
