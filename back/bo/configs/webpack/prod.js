// production config
const { merge } = require('webpack-merge');
const { resolve } = require('path');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: {
    index: { import: './index.tsx' },
  },
  output: {
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
    filename: 'js/[name].[fullhash].js',
    sourceMapFilename: '[name].[fullhash].map',
    chunkFilename: '[id].[chunkhash].js',
  },
  // plugins: [new BundleAnalyzerPlugin()],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
});
