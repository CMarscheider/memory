import { ChosenSettings } from './chosen-settings';
import { createCardSymbols } from './deck';
import { PlayerId, getOtherPlayer } from './players';
import { GameThemeId } from './themes';

/** Number of cards a player may turn over at the same time. */
const MAX_REVEALED_CARDS: number = 2;

/** Everything that changes during one game. */
interface GameState {
  theme: GameThemeId;
  cardSymbols: number[];
  revealedIndexes: number[];
  matchedIndexes: number[];
  scores: Record<PlayerId, number>;
  currentPlayer: PlayerId;
  isBoardLocked: boolean;
}

let gameState: GameState | null = null;

/**
 * Returns the current game state.
 * @returns The state of the started game.
 */
function requireGameState(): GameState {
  if (gameState === null) {
    throw new Error('The game has not been started.');
  }
  return gameState;
}

/**
 * Creates a new game with a shuffled board.
 * @param settings - The settings of the game.
 */
export function startGameState(settings: ChosenSettings): void {
  gameState = {
    theme: settings.gameTheme,
    cardSymbols: createCardSymbols(Number(settings.boardSize)),
    revealedIndexes: [],
    matchedIndexes: [],
    scores: { blue: 0, orange: 0 },
    currentPlayer: settings.player,
    isBoardLocked: false,
  };
}

/**
 * Checks whether a card may be turned over now.
 * @param index - Index of the card.
 * @returns `true` if the card is hidden and the board is not locked.
 */
export function canRevealCard(index: number): boolean {
  const state: GameState = requireGameState();
  const isHidden: boolean = !state.revealedIndexes.includes(index) && !state.matchedIndexes.includes(index);
  const hasFreeSlot: boolean = state.revealedIndexes.length < MAX_REVEALED_CARDS;

  return !state.isBoardLocked && isHidden && hasFreeSlot;
}

/**
 * Marks a card as turned over.
 * @param index - Index of the card.
 * @returns The card face number of the card.
 */
export function revealCard(index: number): number {
  const state: GameState = requireGameState();
  state.revealedIndexes.push(index);
  return state.cardSymbols[index];
}

/**
 * Checks whether two cards are turned over.
 * @returns `true` if the revealed cards are the maximum number of cards.
 */
export function isPairRevealed(): boolean {
  return requireGameState().revealedIndexes.length === MAX_REVEALED_CARDS;
}

/**
 * Checks whether the two revealed cards show the same face.
 * @returns `true` if both revealed cards match.
 */
export function revealedCardsMatch(): boolean {
  const [firstIndex, secondIndex]: number[] = requireGameState().revealedIndexes;
  return getCardSymbol(firstIndex) === getCardSymbol(secondIndex);
}

/**
 * Stores the revealed cards as matched and gives the current player a point.
 * @returns The indexes of the matched cards.
 */
export function acceptRevealedPair(): number[] {
  const state: GameState = requireGameState();
  const matchedIndexes: number[] = [...state.revealedIndexes];

  state.matchedIndexes.push(...matchedIndexes);
  state.scores[state.currentPlayer] += 1;
  state.revealedIndexes = [];
  return matchedIndexes;
}

/**
 * Hides the revealed cards again after a mismatch.
 * @returns The indexes of the cards that were hidden.
 */
export function hideRevealedCards(): number[] {
  const state: GameState = requireGameState();
  const hiddenIndexes: number[] = [...state.revealedIndexes];

  state.revealedIndexes = [];
  return hiddenIndexes;
}

/** Passes the turn to the other player. */
export function switchPlayer(): void {
  const state: GameState = requireGameState();
  state.currentPlayer = getOtherPlayer(state.currentPlayer);
}

/**
 * Locks or unlocks the board, e.g. while a mismatch is shown.
 * @param isLocked - `true` to lock the board.
 */
export function setBoardLocked(isLocked: boolean): void {
  requireGameState().isBoardLocked = isLocked;
}

/**
 * Checks whether every card has been matched.
 * @returns `true` if the game is over.
 */
export function isGameOver(): boolean {
  const state: GameState = requireGameState();
  return state.matchedIndexes.length === state.cardSymbols.length;
}

/**
 * Returns the card face number of a card.
 * @param index - Index of the card.
 * @returns The card face number.
 */
export function getCardSymbol(index: number): number {
  return requireGameState().cardSymbols[index];
}

/** @returns The theme of the running game. */
export function getGameTheme(): GameThemeId {
  return requireGameState().theme;
}

/** @returns The player whose turn it is. */
export function getCurrentPlayer(): PlayerId {
  return requireGameState().currentPlayer;
}

/** @returns The points of both players. */
export function getScores(): Record<PlayerId, number> {
  return requireGameState().scores;
}

/**
 * Returns the winner of the game.
 * @returns The player with more points, or `null` for a draw.
 */
export function getWinner(): PlayerId | null {
  const { blue, orange }: Record<PlayerId, number> = requireGameState().scores;

  if (blue === orange) {
    return null;
  }
  return blue > orange ? 'blue' : 'orange';
}
