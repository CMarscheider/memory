import { getRequiredElement } from './dom-utils';

const BOARD_SELECTOR: string = '[data-board]';
const CARD_CLASS: string = 'card';
const CARD_INNER_CLASS: string = 'card__inner';
const CARD_BACK_CLASS: string = 'card__back';
const CARD_FRONT_CLASS: string = 'card__front';
const CARD_FACE_CLASS: string = 'card__face';
const REVEALED_CLASS: string = 'is-revealed';
const COLUMNS_PROPERTY: string = '--board-columns';

const BOARD_COLUMNS: Record<string, number> = {
  '16': 4,
  '24': 6,
  '36': 6,
};

/**
 * Returns the button of one card.
 * @param index - Index of the card.
 * @returns The card button.
 */
function getCardElement(index: number): HTMLButtonElement {
  return getRequiredElement<HTMLButtonElement>(`[data-card-index="${index}"]`);
}

/**
 * Returns the face image of one card.
 * @param index - Index of the card.
 * @returns The face image inside the card.
 */
function getCardFaceElement(index: number): HTMLImageElement {
  return getRequiredElement<HTMLImageElement>(`[data-card-index="${index}"] .${CARD_FACE_CLASS}`);
}

/**
 * Creates one side of a card.
 * @param className - CSS class of the side.
 * @returns The side element.
 */
function createCardSide(className: string): HTMLSpanElement {
  const side: HTMLSpanElement = document.createElement('span');
  side.className = className;
  return side;
}

/**
 * Creates the front side of a card, which holds the face image.
 * @returns The front side with an empty face image.
 */
function createCardFront(): HTMLSpanElement {
  const front: HTMLSpanElement = createCardSide(CARD_FRONT_CLASS);
  const face: HTMLImageElement = document.createElement('img');

  face.className = CARD_FACE_CLASS;
  face.alt = '';
  front.append(face);
  return front;
}

/**
 * Creates the rotating part of a card with its back and front side.
 * @returns The rotating element.
 */
function createCardInner(): HTMLSpanElement {
  const inner: HTMLSpanElement = createCardSide(CARD_INNER_CLASS);

  inner.append(createCardSide(CARD_BACK_CLASS), createCardFront());
  return inner;
}

/**
 * Creates one face-down card.
 * @param index - Index of the card, starting at 0.
 * @param onSelect - Called with the index when the card is clicked.
 * @returns The card button.
 */
function createCard(index: number, onSelect: (index: number) => void): HTMLButtonElement {
  const card: HTMLButtonElement = document.createElement('button');

  card.type = 'button';
  card.className = CARD_CLASS;
  card.dataset.cardIndex = String(index);
  card.setAttribute('aria-label', `Card ${index + 1}`);
  card.addEventListener('click', (): void => onSelect(index));
  card.append(createCardInner());
  return card;
}

/**
 * Renders the memory board for the chosen board size.
 * @param boardSize - Number of cards, as chosen on the settings page.
 * @param onSelect - Called with the index of every card that is clicked.
 */
export function renderBoard(boardSize: string, onSelect: (index: number) => void): void {
  const board: HTMLElement = getRequiredElement<HTMLElement>(BOARD_SELECTOR);
  const cardCount: number = Number(boardSize);
  const cards: HTMLButtonElement[] = Array.from({ length: cardCount }, (_unused: unknown, index: number): HTMLButtonElement => createCard(index, onSelect));

  board.style.setProperty(COLUMNS_PROPERTY, String(BOARD_COLUMNS[boardSize]));
  board.replaceChildren(...cards);
}

/**
 * Turns a card over to show its face.
 * @param index - Index of the card.
 * @param faceUrl - Image URL of the card face.
 */
export function showCardFace(index: number, faceUrl: string): void {
  getCardFaceElement(index).src = faceUrl;
  getCardElement(index).classList.add(REVEALED_CLASS);
}

/**
 * Turns a card back so that its back side is visible again.
 * @param index - Index of the card.
 */
export function hideCardFace(index: number): void {
  getCardElement(index).classList.remove(REVEALED_CLASS);
}

/**
 * Keeps a matched card face-up and disables it.
 * @param index - Index of the card.
 */
export function markCardMatched(index: number): void {
  getCardElement(index).disabled = true;
}
