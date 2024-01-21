import {ReactiveController} from '@snar/lit';
import {PropertyValues} from 'lit';
import {ColorMode, setBaseStyles, ThemeManager} from 'lit-with-styles';
import {state} from 'snar';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
import sharedStyles from './stylesheets/shared.css?inline';

setBaseStyles(sharedStyles);

@saveToLocalStorage('sfc:theme')
class ThemeStore extends ReactiveController {
	@state() colorMode = ColorMode.SYSTEM;
	// When changing the following default value, we also have
	// to make sure to provide the tokens on start,
	// and also 'theme-color' meta tag in html header
	@state() themeColor = '#07ed6b';

	async updated(changed: PropertyValues) {
		if (changed.has('colorMode')) {
			ThemeManager.mode = this.colorMode;
		}
		const {themeFromSourceColor, applyTheme} = await import(
			'@vdegenne/material-color-helpers'
		);
		const theme = themeFromSourceColor(
			this.themeColor,
			ThemeManager.appliedColorScheme === 'dark',
			'vibrant',
			0,
		);
		applyTheme(document, theme!);
	}

	toggleMode() {
		const currentScheme = ThemeManager.appliedColorScheme!;
		const oppositeMode =
			currentScheme === 'dark' ? ColorMode.LIGHT : ColorMode.DARK;
		const preferredTheme = ThemeManager.preferredColorScheme;
		this.colorMode =
			preferredTheme !== undefined
				? preferredTheme === oppositeMode
					? ColorMode.SYSTEM
					: oppositeMode
				: oppositeMode;
	}
}

export const themeStore = (window.themeStore = new ThemeStore());

window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', () => themeStore.requestUpdate());

declare global {
	interface Window {
		themeStore: ThemeStore;
	}
}

ThemeManager.init();
