/**
 * Material elements + some fixes
 * `rollup-plugin-material-all` should be used to resolve imports
 * and avoid that this import below slow down page initial loads 😄 */
import './material.js';

/**
 * Content
 */
import('./app/app.js');
// import {app} from './app/app.js';
// document.querySelector('material-shell').appendChild(app);

/**
 * Fonts & Styles
 */
import fonts from './styles/stylesheets/fonts.css?inline';
const fontsStyleSheet = new CSSStyleSheet();
fontsStyleSheet.replaceSync(fonts);
document.adoptedStyleSheets.push(fontsStyleSheet);

import('./styles/styles.js');

/**
 * Misc.
 */
import('./global-listeners.js');
