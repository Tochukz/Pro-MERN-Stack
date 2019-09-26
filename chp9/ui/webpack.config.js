require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: { app: ['./src/App.jsx'] },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      UI_API_ENDPOINT: `'${process.env.UI_API_ENDPOINT}'`,
    }),
  ],
};

/** 
 * This configuration produces two bundles: app.bundle.js and vendor.bundle.js
 * app.bundle.js will be the built from the application code.
 * vendor.bundle.js will bre built from third party packages installed in the node_modules directory
 */