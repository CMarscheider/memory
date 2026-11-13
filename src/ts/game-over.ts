import { showView } from './view-navigation';
import { showWinner } from './winner';

const GAME_OVER_DELAY_MS: number = 1000;
const WINNER_DELAY_MS: number = 2000;

let gameOverTimerId: number | null = null;
let winnerTimerId: number | null = null;

/** Shows the game over view and schedules the winner view. The scoreboard already holds the final points. */
function showGameOverView(): void {
  gameOverTimerId = null;
  showView('game-over');
  winnerTimerId = window.setTimeout(showWinnerView, WINNER_DELAY_MS);
}

/** Shows the winner view. */
function showWinnerView(): void {
  winnerTimerId = null;
  showWinner();
}

/** Starts the game over sequence after the last match. */
export function scheduleGameOver(): void {
  gameOverTimerId = window.setTimeout(showGameOverView, GAME_OVER_DELAY_MS);
}

/**
 * Clears a timer if it is still pending.
 * @param timerId - The timer to clear, or `null`.
 */
function clearTimer(timerId: number | null): void {
  if (timerId !== null) {
    window.clearTimeout(timerId);
  }
}

/** Cancels the pending game over and winner timers. */
export function cancelGameOverTimers(): void {
  clearTimer(gameOverTimerId);
  clearTimer(winnerTimerId);
  gameOverTimerId = null;
  winnerTimerId = null;
}
