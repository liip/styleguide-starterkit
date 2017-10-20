const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    compress: true,
    proxy: {
      '**': 'http://localhost:4000'
    },
    port: 3000,
    stats: {
      colors: true
    },
  }
});
