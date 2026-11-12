import codeVibesImageUrl from '../public/assets/code-visual.svg';
import gamingImageUrl from '../public/assets/game-visual.svg';
import { getRequiredElement } from './dom-utils';
import { GAME_THEME_SETTING, findChosenOption, listenToSettingChanges } from './settings-utils';

/** Image and alt text shown for one game theme. */
interface ThemePreview {
  imageUrl: string;
  altText: string;
}

const PREVIEW_IMAGE_SELECTOR: string = '.settings__image';

const THEME_PREVIEWS: Record<string, ThemePreview> = {
  'code-vibes': { imageUrl: codeVibesImageUrl, altText: 'Preview of the Code vibes theme' },
  gaming: { imageUrl: gamingImageUrl, altText: 'Preview of the Gaming theme' },
};

/**
 * Shows the preview image of the given theme.
 * @param themeId - Value of the chosen game theme, e.g. `gaming`.
 */
function showThemePreview(themeId: string): void {
  const previewImage: HTMLImageElement = getRequiredElement<HTMLImageElement>(PREVIEW_IMAGE_SELECTOR);
  const preview: ThemePreview = THEME_PREVIEWS[themeId];

  previewImage.src = preview.imageUrl;
  previewImage.alt = preview.altText;
  previewImage.hidden = false;
}

/** Hides the preview image while no theme is chosen. */
function hideThemePreview(): void {
  getRequiredElement<HTMLImageElement>(PREVIEW_IMAGE_SELECTOR).hidden = true;
}

/** Shows the preview of the chosen game theme, or hides it if none is chosen. */
function refreshThemePreview(): void {
  const chosenTheme: string | undefined = findChosenOption(GAME_THEME_SETTING)?.value;

  if (chosenTheme === undefined) {
    hideThemePreview();
    return;
  }
  showThemePreview(chosenTheme);
}

/** Keeps the theme preview up to date and shows the initial state. */
export function initThemePreview(): void {
  listenToSettingChanges(refreshThemePreview);
  refreshThemePreview();
}
