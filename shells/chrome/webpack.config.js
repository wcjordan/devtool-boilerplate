'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = function(env) {
  env = env || {};
  const config = {
    devtool: env.dev ? 'cheap-module-eval-source-map' : 'source-map',
    entry: {
      background: './shells/chrome/background.js',
      devtool: './shells/chrome/devtool.js',
      injector: './shells/chrome/injector.js',
      injected_script: './src/injected_script.js',
      panel: './src/panel.jsx',
    },
    output: {
      path: __dirname + '/../../build',
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
        filename: 'panel.html',
        template: 'src/panel.html',
        chunks: ['panel']
      }),
      new HtmlWebpackPlugin({
        inject: false,
        filename: 'devtool.html',
        template: 'shells/chrome/devtool.html',
        chunks: ['devtool']
      }),
      new CopyWebpackPlugin([{
        from: 'shells/chrome/manifest.json'
      }, {
        from: 'src/panel.css'
      }, {
        from: 'icons/cog.png',
        to: 'icons/cog.png'
      }]),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: env.dev ? JSON.stringify('development') : JSON.stringify('production')
        }
      })
    ]
  };

  if (!env.dev) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true
    }));
  }
  return config;
};
