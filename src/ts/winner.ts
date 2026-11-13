import bluePawnUrl from '../public/assets/chess-pawn-blue.svg';
import orangePawnUrl from '../public/assets/chess-pawn-orange.svg';
import scaleIconUrl from '../public/assets/scale-icon-draw.svg';
import { getRequiredElement } from './dom-utils';
import { getGameTheme, getWinner } from './game-state';
import { PlayerId } from './players';
import { findThemeImageUrl } from './theme-assets';
import { showView } from './view-navigation';

interface GameResult {
  resultId: PlayerId | 'draw';
  titleText: string;
  nameText: string;
  imageUrl: string;
  hasConfetti: boolean;
}

const WINNER_CONFETTI_SELECTOR: string = '[data-winner-confetti]';
const WINNER_TITLE_SELECTOR: string = '[data-winner-title]';
const WINNER_NAME_SELECTOR: string = '[data-winner-name]';
const WINNER_IMAGE_SELECTOR: string = '[data-winner-image]';

const WINNER_TITLE_TEXT: string = 'The Winner is';
const TROPHY_FILE_PREFIX: string = 'trophy';

const PLAYER_PAWN_URLS: Record<PlayerId, string> = {
  blue: bluePawnUrl,
  orange: orangePawnUrl,
};

const PLAYER_NAME_TEXTS: Record<PlayerId, string> = {
  blue: 'BLUE PLAYER',
  orange: 'ORANGE PLAYER',
};

const DRAW_RESULT: GameResult = {
  resultId: 'draw',
  titleText: "It's a",
  nameText: 'DRAW',
  imageUrl: scaleIconUrl,
  hasConfetti: false,
};

/**
 * Creates the result for a winning player: confetti, the player name and the winner image.
 * The image is the trophy of the theme if it has one, otherwise the pawn of the winner.
 * @param winner - The winning player.
 * @returns The result to show.
 */
function createWinnerResult(winner: PlayerId): GameResult {
  return {
    resultId: winner,
    titleText: WINNER_TITLE_TEXT,
    nameText: PLAYER_NAME_TEXTS[winner],
    imageUrl: findThemeImageUrl(getGameTheme(), TROPHY_FILE_PREFIX) ?? PLAYER_PAWN_URLS[winner],
    hasConfetti: true,
  };
}

/**
 * Fills the winner view with a game result.
 * @param result - The result to show.
 */
function renderGameResult(result: GameResult): void {
  const nameElement: HTMLElement = getRequiredElement<HTMLElement>(WINNER_NAME_SELECTOR);

  getRequiredElement<HTMLElement>(WINNER_CONFETTI_SELECTOR).hidden = !result.hasConfetti;
  getRequiredElement<HTMLElement>(WINNER_TITLE_SELECTOR).textContent = result.titleText;
  getRequiredElement<HTMLImageElement>(WINNER_IMAGE_SELECTOR).src = result.imageUrl;
  nameElement.textContent = result.nameText;
  nameElement.dataset.result = result.resultId;
}

/** Shows the winner view with the result of the finished game. */
export function showWinner(): void {
  const winner: PlayerId | null = getWinner();

  renderGameResult(winner === null ? DRAW_RESULT : createWinnerResult(winner));
  showView('winner');
}
