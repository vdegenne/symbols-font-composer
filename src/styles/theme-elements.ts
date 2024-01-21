import {html} from 'lit';
import {themeStore} from './styles.js';
import '@vdegenne/material-color-helpers/elements/color-mode-picker.js';
import '@vdegenne/material-color-helpers/elements/color-picker.js';
import type {ColorModePicker} from '@vdegenne/material-color-helpers/elements/color-mode-picker.js';
import type {ColorPicker} from '@vdegenne/material-color-helpers/elements/color-picker.js';
import type {ColorMode} from 'lit-with-styles';

export function renderColorModePicker() {
	return html`
		<color-mode-picker
			.value=${themeStore.colorMode}
			@select=${(event: Event) => {
				const target = event.target as ColorModePicker;
				themeStore.colorMode = target.value as ColorMode;
			}}
			icon-only
		></color-mode-picker>
	`;
}

export function renderColorPicker() {
	return html`
		<color-picker
			.value=${themeStore.themeColor}
			@input=${(event: Event) => {
				const target = event.target as ColorPicker;
				themeStore.themeColor = target.value;
			}}
		></color-picker>
	`;
}

export function renderThemeElements() {
	return html`
		<div style="display:flex;align-items:center;gap:18px;">
			${renderColorPicker()} ${renderColorModePicker()}
		</div>
	`;
}
