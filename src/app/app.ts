import '@lit-labs/virtualizer';
import {type MdMenuItem} from '@material/web/menu/menu-item.js';
import {type MdMenu} from '@material/web/menu/menu.js';
import {type MdFilledTextField} from '@material/web/textfield/filled-text-field.js';
import {type MdOutlinedTextField} from '@material/web/textfield/outlined-text-field.js';
import {html, LitElement} from 'lit';
import {withStyles} from 'lit-with-styles';
import {customElement, query, state} from 'lit/decorators.js';
import {materialShellLoadingOff} from 'material-shell';
import {type MdIconName} from 'mwc3-back-helpers/codepoints-maps.js';
import {
	constructSymbolsFontStyleSheetUrl,
	extractSymbolsFontUrlFromStyleSheet,
	fetchSymbolsFontStyleSheet,
	replaceSymbolsFontUrlInStyleSheet,
} from 'mwc3-back-helpers/stylesheet.js';
import toast from 'toastit';
import {SVG_LOGO} from '../assets/assets.js';
import {store} from '../store.js';
import {copyToClipboard, downloadFile} from '../utils.js';
import styles from './app.css?inline';

@customElement('app-shell')
@withStyles(styles)
export class AppShell extends LitElement {
	@state() query = '';

	@query('[type=textarea]') textarea!: MdFilledTextField;
	@query('#search-input') searchInput!: MdOutlinedTextField;
	@query('md-menu') menu!: MdMenu;

	render() {
		const codepoints = store.codePointsMap;

		let searchResult: MdIconName[];
		if (this.query && this.query.length > 1) {
			searchResult = store.iconNames.filter(
				(name) => !store.icons.includes(name) && name.includes(this.query),
			);
		}

		return html`
			<div role="main" slot="content">
				<div id="input-container">
					<md-outlined-text-field
						id="search-input"
						placeholder="Search symbols"
						?disabled="${!codepoints}"
						@keyup=${this.#onKeyUp}
						@focus=${this.#onFocus}
						.value=${this.query}
					>
						${codepoints
							? html` <md-icon slot="leading-icon">search</md-icon> `
							: html`
									<md-circular-progress
										slot="leading-icon"
										style="--md-circular-progress-size:29px;"
										indeterminate
									></md-circular-progress>
								`}

						<md-icon-button
							slot="trailing-icon"
							tabindex="-1"
							@click=${this.#onSettingIconClick}
						>
							<md-icon>settings</md-icon>
						</md-icon-button>
					</md-outlined-text-field>

					<md-menu
						anchor="search-input"
						quick
						?ghost=${searchResult == undefined}
						@close-menu=${(event: CustomEvent) => {
							const item = event.detail.initiator as MdMenuItem;
							if (item.typeaheadText) {
								store.addIcon(item.typeaheadText as MdIconName);
								this.query = '';
								this.searchInput.focus();
							}
						}}
					>
						${searchResult
							? searchResult.length
								? html`
										<lit-virtualizer
											.items=${searchResult}
											.renderItem=${(name: MdIconName) => {
												return html`
													<md-menu-item>
														<md-icon slot="start">${name}</md-icon>
														${name}
														<span slot="supporting-text"
															>${codepoints[name]}</span
														>
													</md-menu-item>
												`;
											}}
										></lit-virtualizer>
									`
								: html`<md-menu-item inert>No result</md-menu-item>`
							: null}
					</md-menu>
				</div>

				<md-filled-card id="icons-area">
					<md-chip-set>
						${store.icons.map((icon) => {
							return html`
								<md-filter-chip
									label=${icon}
									removable
									elevated
									@remove=${(event: Event) => {
										event.preventDefault();
										store.removeIcon(icon);
									}}
									@click=${(event: Event) => {
										event.preventDefault();
										try {
											copyToClipboard(`&#${codepoints[icon]};`);
											toast('Codepoint copied to clipboard!');
										} catch {
											// non-https context, ignore
										}
									}}
								>
									<md-icon slot="icon">${icon}</md-icon>
								</md-filter-chip>
							`;
						})}
						${store.icons.length > 4
							? html`
									<md-assist-chip label="Clear all" @click=${this.#clearAll}>
										<md-icon slot="icon">playlist_remove</md-icon>
									</md-assist-chip>
								`
							: null}
					</md-chip-set>

					${store.icons.length == 0
						? html`
								<div
									style="position: absolute;inset:0;display:flex;justify-content:center;align-items:center;text-align:center;opacity:0.5;line-height:1.5rem"
								>
									<p>
										No symbols selected<br />
										The stylesheet will contain all of them.
									</p>
								</div>
							`
						: html`<span
								style="font-size:0.75rem;color:var(--md-sys-color-outline-variant);position:absolute;bottom:12px"
								>Note: you can click on a chip to copy the icon's
								codepoint</span
							>`}
				</md-filled-card>

				${store.codePointsMap == null
					? html`<div style="text-align: center;">
							<md-circular-progress indeterminate> </md-circular-progress>
						</div>`
					: html`
							<md-outlined-text-field
								readonly
								type="textarea"
								value=${constructSymbolsFontStyleSheetUrl(
									store.variant,
									store.icons.map((icon) => codepoints[icon]),
								)}
							>
								<md-icon-button
									slot="trailing-icon"
									@click=${() => this.copyLink()}
								>
									<md-icon>content_copy</md-icon>
								</md-icon-button>
							</md-outlined-text-field>

							<div id="actions">
								<md-filled-button @click=${this.downloadStyleSheet}>
									<md-icon slot="icon">download</md-icon>
									Download stylesheet
								</md-filled-button>

								<md-filled-button @click=${this.downloadFont}>
									<md-icon slot="icon">download</md-icon>
									Download font
								</md-filled-button>
							</div>
						`}
			</div>

			<footer>
				<md-filled-tonal-icon-button
					@click=${async () => {
						const {showAbout} = await import('../about-dialog.js');
						showAbout();
					}}
				>
					${SVG_LOGO}
				</md-filled-tonal-icon-button>
			</footer>
		`;
	}

	async #clearAll() {
		try {
			const {materialConfirm} = await import('material-3-prompt-dialog');
			await materialConfirm();
			store.reset();
		} catch {}
	}

	async #onSettingIconClick() {
		const {settingsDialog} = await import(
			'../settings-dialog/settings-dialog.js'
		);
		settingsDialog.open = true;
	}

	#onKeyUp(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.query = '';
			return;
		}
		this.search(this.searchInput.value);
	}
	#onFocus() {
		this.menu.open = true;
	}

	#searchDebounce: number | undefined;
	search(query: string) {
		clearTimeout(this.#searchDebounce);
		this.#searchDebounce = setTimeout(() => (this.query = query), 0);
	}

	async downloadStyleSheet() {
		try {
			let ss = await fetchSymbolsFontStyleSheet(
				store.variant,
				store.icons.map((icon) => store.codePointsMap[icon]),
			);
			ss = replaceSymbolsFontUrlInStyleSheet(ss, '/material-symbols.woff2');
			downloadFile(ss, 'material-symbols.css');
		} catch (error) {
			toast('Something went wrong, check console');
			console.error(error);
		}
	}
	async downloadFont() {
		try {
			const ss = await fetchSymbolsFontStyleSheet(
				store.variant,
				store.icons.map((icon) => store.codePointsMap[icon]),
			);
			const fontUrl = extractSymbolsFontUrlFromStyleSheet(ss);
			downloadFile(fontUrl, 'material-symbols.woff2');
		} catch (error) {
			toast('Something went wrong, check console');
			console.error(error);
		}
	}

	copyLink() {
		try {
			copyToClipboard(this.textarea.value);
			toast('Link copied to clipboard!');
		} catch {
			toast('Copy is blocked in non-https context');
		}
	}

	firstUpdated() {
		store.bind(this);
		materialShellLoadingOff.call(this);
	}
}

declare global {
	interface Window {
		app: AppShell;
	}
	interface HTMLElementTagNameMap {
		'app-shell': AppShell;
	}
}

// export const app = (window.app = new AppShell());
