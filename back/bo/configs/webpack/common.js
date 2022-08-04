// shared config (dev and prod)
const { resolve } = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvFlow = require('dotenv-flow-webpack');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        // use: ['url-loader'],
        use: ['@svgr/webpack', 'file-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        // use: [
        //   'file-loader?hash=sha512&digest=hex&name=img/[chunkhash].[ext]',
        //   'image-webpack-loader?
        // bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        // ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new DotenvFlow(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../../public/index.html'),
      hash: true,
      inject: true,
      // favicon: resolve(__dirname, '../../public/favicon.png'),
    }),
  ],
  performance: {
    hints: false,
  },
};
