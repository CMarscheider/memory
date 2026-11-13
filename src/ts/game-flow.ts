import { hideCardFace, markCardMatched, showCardFace } from './board';
import { renderScoreboard } from './game-header';
import { getCardFaceUrl } from './deck';
import { cancelGameOverTimers, scheduleGameOver } from './game-over';
import {
  acceptRevealedPair,
  canRevealCard,
  getGameTheme,
  hideRevealedCards,
  isGameOver,
  isPairRevealed,
  revealCard,
  revealedCardsMatch,
  setBoardLocked,
  switchPlayer,
} from './game-state';

const HIDE_DELAY_MS: number = 1000;

let hideTimerId: number | null = null;

/** Cancels all pending timers, e.g. when a new game starts or the player exits. */
export function cancelPendingTimers(): void {
  if (hideTimerId !== null) {
    window.clearTimeout(hideTimerId);
    hideTimerId = null;
  }
  cancelGameOverTimers();
}

/**
 * Turns over the card that was clicked and checks the pair if two cards are open.
 * @param index - Index of the clicked card.
 */
export function handleCardSelected(index: number): void {
  if (!canRevealCard(index)) {
    return;
  }
  const cardSymbol: number = revealCard(index);
  showCardFace(index, getCardFaceUrl(getGameTheme(), cardSymbol));

  if (isPairRevealed()) {
    checkRevealedPair();
  }
}

/** Decides whether the two open cards are a match or not. */
function checkRevealedPair(): void {
  if (revealedCardsMatch()) {
    handleMatch();
  } else {
    handleMismatch();
  }
}

/** Keeps a matching pair open; the same player continues and gets a point. */
function handleMatch(): void {
  acceptRevealedPair().forEach(markCardMatched);
  renderScoreboard();

  if (isGameOver()) {
    setBoardLocked(true);
    scheduleGameOver();
  }
}

/** Shows a mismatched pair for a moment, then hides it and passes the turn. */
function handleMismatch(): void {
  setBoardLocked(true);
  hideTimerId = window.setTimeout(hideMismatchedPair, HIDE_DELAY_MS);
}

/** Hides the open cards, passes the turn and unlocks the board. */
function hideMismatchedPair(): void {
  hideTimerId = null;
  hideRevealedCards().forEach(hideCardFace);
  switchPlayer();
  setBoardLocked(false);
  renderScoreboard();
}
