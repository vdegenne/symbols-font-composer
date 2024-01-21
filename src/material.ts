/**
 * When uncommenting a fix below, the element
 * subjected to the fix needs to be imported,
 * Please do not import the element from
 * `@material/web/all.js` directly but from the
 * element's folder, or all elements will be
 * bundled inside the final builds...
 */
import '@material/web/all.js';
import {MdOutlinedField} from '@material/web/field/outlined-field.js';
import {css} from 'lit';
import {DEV} from './constants.js';

// This is used during development to see what elements are used in the page.
// if (DEV) {
setTimeout(() => {
	import('mwc3-back-helpers/browser.js').then(({getAvailableElements}) => {
		console.log(
			'Material elements found in the page: ',
			getAvailableElements(),
		);
	});
}, 3000);
// const {MdElementsImportsMap} = await import(
// 	'mwc3-back-helpers/md-elements-imports-map.js'
// );
// console.log(
// 	Object.keys(MdElementsImportsMap).filter((name) => name.includes('field')),
// );
// }

// MdDialog.shadowRootOptions.delegatesFocus = false;

// MdDialog.addInitializer(async (instance: MdDialog) => {
// 	await instance.updateComplete;
// 	instance.dialog.prepend(instance.scrim);
// 	instance.scrim.style.inset = 0;
// 	instance.scrim.style.zIndex = -1;

// 	const {getOpenAnimation, getCloseAnimation} = instance;
// 	instance.getOpenAnimation = () => {
// 		const animations = getOpenAnimation.call(this);
// 		animations.container = [...animations.container, ...animations.dialog];
// 		animations.dialog = [];
// 		return animations;
// 	};
// 	instance.getCloseAnimation = () => {
// 		const animations = getCloseAnimation.call(this);
// 		animations.container = [...animations.container, ...animations.dialog];
// 		animations.dialog = [];
// 		return animations;
// 	};
// });

// Gives a slight surface color for better visual distinction
MdOutlinedField.elementStyles.push(css`
	.container-overflow {
		background-color: var(
			--md-outlined-text-field-container-color,
			var(--md-sys-color-surface)
		);
	}
`);

// MdListItem.elementStyles.push(css`
// 	a,
// 	button,
// 	li {
// 		width: 100%;
// 	}
// `);

// MdItem.elementStyles.push(css`
// 	[name='start']::slotted(*) {
// 		overflow: initial;
// 	}
// `);

// MdFilterChip.elementStyles.push(css`
// 	.leading.icon,
// 	#button {
// 		position: initial !important;
// 	}
// `);
