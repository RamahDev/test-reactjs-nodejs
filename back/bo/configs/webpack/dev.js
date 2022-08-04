// development config
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const { resolve } = require('path');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8008',
    'webpack/hot/only-dev-server',
    './index.tsx',
  ],
  output: {
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: {
      index: '/',
    },
    hot: true,
    port: '8008',
  },
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
