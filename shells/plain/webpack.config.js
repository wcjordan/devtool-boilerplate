'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = function(env) {
  env = env || {};
  const config = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
      injected_script: './src/injected_script.js',
      plainShell: './shells/plain/plainShell.js',
    },
    output: {
      path: __dirname + '/build',
      filename: '[name].js',
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader:  'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        },
      }],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        filename: 'plainShell.html',
        template: 'shells/plain/plainShell.html',
        chunks: ['plainShell']
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      })
    ]
  };
  return config;
};
