const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    injected_script: './src/injected_script.js',
    plainShell: './shells/plain/plainShell.js',
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react'],
      },
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'plainShell.html',
      template: 'shells/plain/plainShell.html',
      chunks: ['plainShell'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
