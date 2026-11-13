import codeVibesImageUrl from '../public/assets/code-visual.svg';
import gamingImageUrl from '../public/assets/game-visual.svg';
import { getRequiredElement } from './dom-utils';
import { GAME_THEME_SETTING, findChosenOption, listenToSettingChanges } from './settings-utils';

interface ThemePreview {
  imageUrl: string;
  altText: string;
}

const PREVIEW_IMAGE_SELECTOR: string = '.settings__image';
const PREVIEW_SWITCH_CLASS: string = 'is-switching';
const THEME_OPTION_SELECTOR: string = `input[name="${GAME_THEME_SETTING}"]`;

const THEME_PREVIEWS: Record<string, ThemePreview> = {
  'code-vibes': { imageUrl: codeVibesImageUrl, altText: 'Preview of the Code vibes theme' },
  gaming: { imageUrl: gamingImageUrl, altText: 'Preview of the Gaming theme' },
};

/**
 * Plays the switch animation again, even if the class is already set.
 * Removing the class and forcing a reflow restarts the CSS animation.
 * @param image - The preview image to animate.
 */
function restartSwitchAnimation(image: HTMLImageElement): void {
  image.classList.remove(PREVIEW_SWITCH_CLASS);
  void image.offsetWidth;
  image.classList.add(PREVIEW_SWITCH_CLASS);
}

/**
 * Shows the preview image of the given theme with a short animation.
 * Nothing changes if that image is already shown.
 * @param themeId - Value of the chosen game theme, e.g. `gaming`.
 */
function showThemePreview(themeId: string): void {
  const previewImage: HTMLImageElement = getRequiredElement<HTMLImageElement>(PREVIEW_IMAGE_SELECTOR);
  const preview: ThemePreview = THEME_PREVIEWS[themeId];

  if (previewImage.getAttribute('src') === preview.imageUrl) {
    return;
  }

  previewImage.src = preview.imageUrl;
  previewImage.alt = preview.altText;
  previewImage.hidden = false;
  restartSwitchAnimation(previewImage);
}

/** Shows the preview of the chosen game theme. A theme is always chosen, so there is no empty state. */
function refreshThemePreview(): void {
  const chosenTheme: string | undefined = findChosenOption(GAME_THEME_SETTING)?.value;

  if (chosenTheme !== undefined) {
    showThemePreview(chosenTheme);
  }
}

/**
 * Checks whether the pointer is over the group of theme options.
 * A mouse click moves the focus away from the old option before the new one is chosen,
 * so the focus alone does not tell whether the user stays on the theme options.
 * @param themeOption - One radio button of the theme group.
 * @returns `true` if the pointer is over the theme group.
 */
function isPointerOverThemeGroup(themeOption: HTMLInputElement): boolean {
  return themeOption.closest('fieldset')?.matches(':hover') === true;
}

/**
 * Shows the preview of a theme while its option is hovered or focused.
 * When the pointer or the focus leaves the theme group, the preview of the chosen theme comes back.
 * @param themeOption - The radio button of one theme.
 */
function listenToThemeOption(themeOption: HTMLInputElement): void {
  const optionLabel: HTMLLabelElement | null = themeOption.closest<HTMLLabelElement>('label');
  const showOptionPreview: () => void = (): void => {
    showThemePreview(themeOption.value);
  };
  const restoreChosenPreview: () => void = (): void => {
    if (!isPointerOverThemeGroup(themeOption)) {
      refreshThemePreview();
    }
  };

  optionLabel?.addEventListener('pointerenter', showOptionPreview);
  optionLabel?.addEventListener('pointerleave', restoreChosenPreview);
  themeOption.addEventListener('focus', showOptionPreview);
  themeOption.addEventListener('blur', restoreChosenPreview);
}

/** Keeps the theme preview up to date, previews hovered themes and shows the initial state. */
export function initThemePreview(): void {
  document.querySelectorAll<HTMLInputElement>(THEME_OPTION_SELECTOR).forEach(listenToThemeOption);
  listenToSettingChanges(refreshThemePreview);
  refreshThemePreview();
}
