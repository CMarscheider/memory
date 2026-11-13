import { GameThemeId } from './themes';

const THEME_IMAGE_SELECTOR: string = '[data-theme-image]';
const THEMES_FOLDER: string = '../public/assets/themes';

const THEME_IMAGE_URLS: Record<string, string> = import.meta.glob('../public/assets/themes/*/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

/**
 * Finds the image of a theme whose file name starts with the given prefix.
 * @param themeId - The game theme.
 * @param namePrefix - Start of the file name, e.g. `label-blue`.
 * @returns The image URL, or `undefined` if the theme has no such image.
 */
export function findThemeImageUrl(themeId: GameThemeId, namePrefix: string): string | undefined {
  const pathPrefix: string = `${THEMES_FOLDER}/${themeId}/${namePrefix}`;
  const matchingPath: string | undefined = Object.keys(THEME_IMAGE_URLS).find((path: string): boolean => path.startsWith(pathPrefix));

  return matchingPath === undefined ? undefined : THEME_IMAGE_URLS[matchingPath];
}

/**
 * Shows the image of the theme in one themed image element.
 * An image that the theme does not have is cleared, so no other theme's image stays visible.
 * @param image - An image with a `data-theme-image` attribute.
 * @param themeId - The game theme.
 */
function applyThemeImage(image: HTMLImageElement, themeId: GameThemeId): void {
  const imageUrl: string | undefined = findThemeImageUrl(themeId, image.dataset.themeImage ?? '');

  if (imageUrl === undefined) {
    image.removeAttribute('src');
  } else {
    image.src = imageUrl;
  }
}

/**
 * Sets every themed image on the page to the image of the given theme.
 * @param themeId - The game theme.
 */
export function applyThemeImages(themeId: GameThemeId): void {
  document.querySelectorAll<HTMLImageElement>(THEME_IMAGE_SELECTOR).forEach((image: HTMLImageElement): void => {
    applyThemeImage(image, themeId);
  });
}
