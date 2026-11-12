import './styles/fonts.scss';
import './styles/style.scss';
import './styles/settings.scss';
import './styles/themes.scss';
import './styles/game.scss';
import { initExitDialog } from './ts/exit-dialog';
import { initSettingsSummary } from './ts/settings-summary';
import { initThemePreview } from './ts/settings-preview';
import { initViewNavigation } from './ts/view-navigation';

/** Starts the app once the DOM has been parsed. */
function initApp(): void {
  initViewNavigation();
  initThemePreview();
  initSettingsSummary();
  initExitDialog();
}

document.addEventListener('DOMContentLoaded', initApp);
