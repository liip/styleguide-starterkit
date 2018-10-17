# Styleguide starterkit

A starterkit to create web styleguides with [Fractal](http://fractal.build/) and [Webpack](https://webpack.js.org/).

- Fractal pre-configured with [Nunjucks](https://mozilla.github.io/nunjucks/)
- JavaScript bundling with Webpack and [Babel](http://babeljs.io/)
- Sass compilation, including [Autoprefixer](https://github.com/postcss/autoprefixer)
- [SVG icons sprite](https://css-tricks.com/svg-symbol-good-choice-icons/) generation
- Live reload (with hot module replacement) for comfortable development
- Automated release management with [release-it](https://github.com/webpro/release-it)


## Installation

Prerequisites: [Node.js](https://nodejs.org/en/) >= 6, <= 10

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


## Release

The starterkit comes with a preconfigured release management tool. It will automatically update the `CHANGELOG.md` file at the root of the project based on the commit messages as long as they follow the [Angular commit guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). It will also bump the version number in the `package.json`, run the build command above, commit, tag and push the changes. This process is interactive and you’ll be able to skip steps manually if you like.

To release a new version run:

```bash
npm run release [patch|minor|major|version_number]
```

By default the version bump is automatically determined based on the commits messages.

Read more in the [release-it documentation](https://github.com/webpro/release-it).

## Deploy

To deploy a build of the styleguide, simply replace the blank command in the `package.json`, under `scripts -> deploy`. This will be automatically invoked at the end of the release process described above.

An example of a simple deploy command using `rsync`:

```json
"deploy": "rsync -avzP --delete --exclude='.*' dist/ user@server.com:/var/www/html/my-styleguide"
```

You can also run it manually at any time with:

```bash
npm run deploy
```


## Misc

### Browsers support

The browsers support is defined in `.browserslistrc`. It’s used both by [Autoprefixer](https://github.com/postcss/autoprefixer) for the CSS and by [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) for the JavaScript.

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
