<div align="center">
<img src="https://raw.githubusercontent.com/vdegenne/symbols-font-composer/main/public/logo.svg" width=120><br>
<b>symbols-font-composer PWA</b>
</div>

`symbols-font-composer` PWA can be used to compose Material Symbols font, only containing icons you decide to include, which minimize the final icon font file size your application serve.

✨ If you want to automate this process instead, the following plugins can also be used:

- [rollup-plugin-md-icon](https://github.com/vdegenne/rollup-plugin-md-icon)
- [vite-plugin-md-icon](https://github.com/vdegenne/vite-plugin-md-icon)

## About PWA

This PWA makes use of the following libraries:

- [@material/web](https://github.com/material-components/material-web): UI Web Components
- [lit](https://github.com/lit/lit): Base Web Components library
- [vite](https://github.com/vitejs/vite): front-end tooling

And makes use of the following tools/plugins:

- [rollup-plugin-material-all](https://www.npmjs.com/package/rollup-plugin-material-all): code import-free, this plugin will automatically include `@material/web` elements that your application need.
- [mwc3-back-helpers](https://github.com/vdegenne/mwc3-back-helpers): A suite of modules for building tools around `@material/web` framework.
- [material-shell](https://www.npmjs.com/package/material-shell): A small shell element to initialize a Material-web project in.

Along with some author's personals: `lit-with-styles`, `@snar/lit`, `material-3-prompt-dialog`, `@vdegenne/material-color-helpers`, ...

## License

MIT
