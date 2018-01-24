# Styleguide starterkit

A starterkit to create web styleguides with [Fractal](http://fractal.build/) and [Webpack](https://webpack.js.org/).

- Fractal pre-configured with [Nunjucks](https://mozilla.github.io/nunjucks/)
- JavaScript bundling with Webpack and [Babel](http://babeljs.io/)
- Sass compilation, including [Autoprefixer](https://github.com/postcss/autoprefixer)
- [SVG icons sprite](https://css-tricks.com/svg-symbol-good-choice-icons/) generation
- Live reload (with hot module replacement) for comfortable development

## Installation

Inside the directory of your choice, install a copy of the starterkit with:

```bash
curl -L https://github.com/liip/styleguide-starterkit/archive/master.tar.gz | tar zx --strip 1
```

Then install the npm dependencies with:

```bash
npm install
```

## Getting started

To start the development server, run:

```bash
npm start
```

You can now access your styleguide at [localhost:3000](http://localhost:3000).

You’re all set, start to:

- Create components as `.nunj` (Nunjucks) files inside the `components` directory
- Write some style inside `assets/scss/common.scss`
- Write JavaScript inside `assets/scripts/common.js`
- Put some `*.svg` icons in the `assets/icons` directory
- Write documentation as `.md` (Markdown) files inside the `docs` directory.

## Build

You can build a static version of the styleguide to deploy it wherever you like by running:

```
npm run build
```

The generated files go to the `dist` directory.

## Misc

### Browsers support

The browsers support is defined in the `package.json`, in the `browserslist` entry. It’s used both by Autoprefixer for the CSS and by babel-preset-env for the JavaScript.

Check [browserslist’s documentation](https://github.com/ai/browserslist) to change the browser support.

### Icons

Icons placed inside `assets/icons` are combined into a sprite called `icons.svg` when referenced. To load them, either reference them in your JavaScript:

```js
import 'icons/foo.svg';
```

Or in your stylesheet:

```scss
background-image: url('../icons/foo.svg');
```

Webpack will automatically rewrite the links to the sprite with the correct identifier. See [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader) documentation for more information.

You can then easily use an icon in a template with the icon snippet:

```nunj
{% render '@icon', { id: 'foo', class: 'bar' } %}
```

**Warning:** This method of including remote SVG file is not supported by Internet Explorer 11 and below. You may want to polyfill it with [svgxuse](https://github.com/Keyamoon/svgxuse).
