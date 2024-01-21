import {ReactiveController} from '@snar/lit';
import {state} from 'lit/decorators.js';
import {
	type MdIconName,
	type CodePointsMap,
} from 'mwc3-back-helpers/codepoints-maps.js';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
import {Variant} from 'mwc3-back-helpers/md-icons.js';

@saveToLocalStorage('sfc:store')
class Store extends ReactiveController {
	@state() codePointsMap: typeof CodePointsMap = null;
	@state() icons: MdIconName[] = [
		'edit',
		'delete',
		'add',
		'settings',
		'clinical_notes',
		'kitesurfing',
		'baby_changing_station',
	];
	@state() variant: Variant = Variant.OUTLINED;

	iconNames: MdIconName[];

	async firstUpdated() {
		if (this.codePointsMap == null) {
			try {
				const {CodePointsMap} = await import(
					'mwc3-back-helpers/codepoints-maps.js'
				);
				this.codePointsMap = CodePointsMap;
			} catch {}
		}

		this.iconNames = Object.keys(this.codePointsMap) as MdIconName[];
	}

	reset() {
		this.icons = [];
	}

	addIcon(name: MdIconName) {
		if (this.icons.includes(name)) return;
		this.icons = [...this.icons, name];
	}

	removeIcon(name: MdIconName) {
		this.icons.splice(this.icons.indexOf(name) >>> 0, 1);
		this.icons = [...this.icons]; // Force update
	}
}

export const store = new Store();
