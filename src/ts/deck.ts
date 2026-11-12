import { findThemeImageUrl } from './theme-assets';
import { GameThemeId } from './themes';

/** Number of different card faces available per theme (card-symbol-1 to card-symbol-18). */
const SYMBOL_COUNT: number = 18;
/** Every card face appears on exactly this many cards. */
const CARDS_PER_PAIR: number = 2;
/** Card faces are named card-symbol-1.svg, card-symbol-2.svg and so on. */
const CARD_FACE_FILE_PREFIX: string = 'card-symbol-';
const MISSING_IMAGE_URL: string = '';

/**
 * Returns the URL of one card face of a theme.
 * @param themeId - The game theme.
 * @param symbolNumber - Number of the card face, starting at 1.
 * @returns The image URL of the card face.
 */
export function getCardFaceUrl(themeId: GameThemeId, symbolNumber: number): string {
  return findThemeImageUrl(themeId, `${CARD_FACE_FILE_PREFIX}${symbolNumber}.svg`) ?? MISSING_IMAGE_URL;
}

/**
 * Shuffles a list in place with the Fisher-Yates algorithm.
 * @param items - The list to shuffle.
 * @returns The same list, now in random order.
 */
function shuffle<T>(items: T[]): T[] {
  for (let index: number = items.length - 1; index > 0; index -= 1) {
    const swapIndex: number = Math.floor(Math.random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }
  return items;
}

/**
 * Creates the shuffled card faces: every chosen face appears on two cards.
 * @param cardCount - Number of cards on the board.
 * @returns The card face number for every card index.
 */
export function createCardSymbols(cardCount: number): number[] {
  const pairCount: number = cardCount / CARDS_PER_PAIR;
  const allSymbols: number[] = Array.from({ length: SYMBOL_COUNT }, (_unused: unknown, index: number): number => index + 1);
  const chosenSymbols: number[] = shuffle(allSymbols).slice(0, pairCount);

  return shuffle(chosenSymbols.flatMap((symbol: number): number[] => [symbol, symbol]));
}
