const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const browserslist = require('./package.json').browserslist;


// Extract CSS to a dedicated file when we’re not developing
const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development'
});

// Extract icons in a dedicated SVG file
const extractIcons = new SpriteLoaderPlugin();

module.exports = {
  resolve: {
    modules: [
      path.resolve(__dirname, 'assets/scripts'),
      'node_modules'
    ],
    extensions: ['.js']
  },
  entry: {
    common: path.resolve(__dirname, 'assets/scripts/common.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: browserslist
              }
            }]
          ]
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')()
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['node_modules']
              }
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(svg|png|jpe?g|gif|woff|woff2|eot|ttf|otf)$/,
        exclude: path.resolve('./assets/icons'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: path.resolve('./assets/icons'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'assets/icons.svg',
              esModule: false,
            }
          },
          'svgo-loader'
        ],
      }
    ]
  },
  plugins: [
    extractSass,
    extractIcons
  ],
};
