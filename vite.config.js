import {minifyHtml} from '@vdegenne/rollup-plugin-minify-html';
import CleanCSS from 'clean-css';
import {materialShell} from 'material-shell/vite.js';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {materialAll} from 'rollup-plugin-material-all';
import minifyLiterals from 'rollup-plugin-minify-template-literals';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

const emptyPolyfills = join(__dirname, 'empty-polyfills.js');

export default defineConfig({
	resolve: {
		/**
		 * mwc3-back-helpers is more of a node library.
		 * We provide empty polyfills to pass the build
		 * process. There is no problem because we never
		 * use functions that require these fs functions
		 * in the app.
		 */
		alias: {
			'node:fs/promises': emptyPolyfills,
			'node:fs': emptyPolyfills,
			'fs/promises': emptyPolyfills,
			'node:path': emptyPolyfills,
		},
	},
	esbuild: {
		legalComments: 'external',
	},
	plugins: [
		/**
		 * For this application we need a full size symbols font file
		 * for displaying all icons in the app. So we don't use the following
		 * plugin but rather use the script `scripts/download-full-symbols-files.mjs`
		 * to download the files before building
		 */
		// mdIcon(),

		// Will inline minified scripts to load styles and shell element for fast feedback.
		materialShell(),

		/**
		 * We want different default styles so we inject them in localstorage 'material-theme'.
		 * This will be loaded by the material shell (see plugin above)
		 */
		{
			name: 'inline-initial-material-styles',
			async transformIndexHtml() {
				const inline = new CleanCSS().minify(
					await readFile('src/styles/stylesheets/material.css'),
				).styles;
				return [
					{
						tag: 'script',
						children: `if (!localStorage.getItem('material-theme')) { localStorage.setItem('material-theme', '${inline}'); }`,
					},
				];
			},
		},

		materialAll({
			include: [
				'src/**/*.ts',
				'node_modules/@vdegenne/material-color-helpers/**/*.js',
				'node_modules/material-3-prompt-dialog/**/*.js',
			],
			// External elements
			additionalElements: [
				...(process.env.NODE_ENV == 'development'
					? [
							// Unfortunately Vite has an obscure way of managing dependencies during dev
							// We have to explicitly include these elements which can't be detected from
							// the node_modules includes above.
							'md-dialog',
							'md-outlined-segmented-button-set',
							'md-outlined-segmented-button',
						]
					: []),
				'md-text-button',
			],
		}),

		/** Minifications */
		minifyHtml(),
		process.env.NODE_ENV == 'production' ? minifyLiterals() : [],

		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['**/*.{ico,woff2,svg}'],
			manifest: {
				icons: [
					{
						src: 'pwa-64x64.png',
						sizes: '64x64',
						type: 'image/png',
					},
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: 'maskable-icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},
		}),
	],
});
