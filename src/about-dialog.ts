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
			<md-elevated-card style="padding:12px 18px 8px">
				<div
					style="display:flex;align-items:center;justify-content:center;gap:5px;"
				>
					UI powered by:
					<md-icon-button form href="https://material-web.dev/" target="_blank">
						<md-icon>${SVG_MATERIAL}</md-icon>
					</md-icon-button>
					<md-icon-button form href="https://lit.dev/" target="_blank">
						<md-icon>${SVG_LIT}</md-icon>
					</md-icon-button>
				</div>
				<md-filled-tonal-button
					style="margin: 8px 0"
					href="https://github.com/vdegenne/symbols-font-composer"
					target="_blank"
					form
				>
					<md-icon slot="icon">${SVG_GITHUB}</md-icon>
					See source code on GitHub
				</md-filled-tonal-button>
			</md-elevated-card>
			<footer>2024 &copy; MIT License</footer>
		`,
		styles: {
			width: '471px',
			'--about-dialog-img-size': '170px',
			'--md-elevated-card-container-shape': '35px',
		},
	});
}
