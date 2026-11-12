/** Names of the views on the single page; they match the `data-view` attribute of each section. */
export type ViewName = 'home' | 'settings' | 'game' | 'game-over' | 'winner';

const VIEW_SECTION_SELECTOR: string = '.view';
const VIEW_TARGET_SELECTOR: string = '[data-view-target]';

/**
 * Checks whether a value names one of the views.
 * @param value - Value read from a button or the page.
 * @returns `true` if the value is a known view name, otherwise `false`.
 */
function isViewName(value: string | undefined): value is ViewName {
  return value === 'home' || value === 'settings' || value === 'game' || value === 'game-over' || value === 'winner';
}

/**
 * Shows the view with the given name and hides all others.
 * @param viewName - The view to show.
 */
export function showView(viewName: ViewName): void {
  document.body.dataset.view = viewName;

  document.querySelectorAll<HTMLElement>(VIEW_SECTION_SELECTOR).forEach((section: HTMLElement): void => {
    section.hidden = section.dataset.view !== viewName;
  });
}

/**
 * Opens the view that a button points to when the button is clicked.
 * @param button - A button with a `data-view-target` attribute.
 */
function openViewOnClick(button: HTMLElement): void {
  button.addEventListener('click', (): void => {
    const targetView: string | undefined = button.dataset.viewTarget;

    if (isViewName(targetView)) {
      showView(targetView);
    }
  });
}

/** Connects every button with a `data-view-target` attribute to its view. */
export function initViewNavigation(): void {
  document.querySelectorAll<HTMLElement>(VIEW_TARGET_SELECTOR).forEach(openViewOnClick);
}
