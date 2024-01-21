import {downloadSymbolsFontFromStyleSheet} from 'mwc3-back-helpers/fonts.js';
import {Variant} from 'mwc3-back-helpers/md-icons.js';
import {
	fetchSymbolsFontStyleSheet,
	replaceSymbolsFontUrlInStyleSheet,
} from 'mwc3-back-helpers/stylesheet.js';
import {writeFile} from 'node:fs/promises';

async function main() {
	const ss = await fetchSymbolsFontStyleSheet(Variant.ROUNDED);
	// Saving the font
	await downloadSymbolsFontFromStyleSheet(ss, {
		filepath: 'public/material-symbols.woff2',
	});

	// Saving the stylesheet with updated font url
	const modifiedSS = replaceSymbolsFontUrlInStyleSheet(
		ss,
		'/material-symbols.woff2',
	);
	await writeFile('src/styles/stylesheets/symbols.css', modifiedSS);
}

main();
