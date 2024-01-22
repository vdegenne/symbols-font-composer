import {type MdOutlinedSelect} from '@material/web/select/outlined-select.js';
import {customElement} from 'custom-element-decorator';
import {css, html, LitElement} from 'lit';
import {withStyles} from 'lit-with-styles';
import {state} from 'lit/decorators.js';
import {Variant} from 'mwc3-back-helpers/md-icons.js';
import {store} from '../store.js';
import {themeStore} from '../styles/styles.js';
import {renderThemeElements} from '../styles/theme-elements.js';

declare global {
	interface HTMLElementTagNameMap {
		'settings-dialog': SettingsDialog;
	}
}

@customElement({name: 'settings-dialog', inject: true})
@withStyles(css`
	md-outlined-select {
		margin-top: 32px;
		width: 100%;
	}
`)
class SettingsDialog extends LitElement {
	@state() open = false;

	firstUpdated() {
		themeStore.bind(this);
	}

	render() {
		return html`
			<md-dialog ?open=${this.open} @close=${() => (this.open = false)}>
				<div slot="headline">Settings</div>
				<div slot="content">
					${renderThemeElements()}
					<md-outlined-select
						label="variant"
						value=${store.variant}
						@input=${(event: Event) => {
							const target = event.target as MdOutlinedSelect;
							store.variant = target.value as Variant;
						}}
						supporting-text="variant of the font"
					>
						${Object.entries(Variant).map(([variant, value]) => {
							return html`
								<md-select-option value=${value}>${variant}</md-select-option>
							`;
						})}
					</md-outlined-select>
				</div>
				<div slot="actions">
					<md-text-button @click=${() => (this.open = false)}
						>Close</md-text-button
					>
				</div>
			</md-dialog>
		`;
	}
}

export const settingsDialog = new SettingsDialog();
