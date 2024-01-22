import {aboutDialog} from '@vdegenne/about-dialog';
import {SVG_GITHUB, SVG_LIT, SVG_LOGO, SVG_MATERIAL} from './assets/assets.js';
import {html} from 'lit';

export function showAbout() {
	aboutDialog({
		title: 'symbols-font-composer',
		img: html`${SVG_LOGO}`,
		version: '1.0.0',
		body: html`
			<style>
				p {
					margin-bottom: 0;
				}
			</style>
			<div style="display:flex;align-items:center;justify-content:center;">
				UI powered by:
				<md-icon-button form href="https://material-web.dev/" target="_blank">
					<md-icon>${SVG_MATERIAL}</md-icon>
				</md-icon-button>
				<md-icon-button form href="https://lit.dev/" target="_blank">
					<md-icon>${SVG_LIT}</md-icon>
				</md-icon-button>
			</div>
			<md-filled-tonal-button
				style="margin: 12px 0"
				href="https://github.com/vdegenne/symbols-font-composer"
				target="_blank"
				form
			>
				<md-icon slot="icon">${SVG_GITHUB}</md-icon>
				See source code on GitHub
			</md-filled-tonal-button>
			<footer>2024 &copy; MIT License</footer>
		`,
		styles: {
			width: '100%',
			'--about-dialog-img-size': '170px',
		},
	});
}
