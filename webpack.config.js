const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const parts = require('./webpack.parts');
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new CaseSensitivePathsPlugin(), // complain about capitalisation
      new NpmInstallPlugin(), // install dependencies automatically
      new FriendlyErrorsWebpackPlugin(), // Webpack is mean by default
      // new NyanProgressPlugin(), // Show progress
      new DashboardPlugin(),
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            // Fail only on errors
            failOnWarning: false,
            failOnError: true,

            // Toggle autofix
            fix: true,

            // Output to Jenkins compatible XML
            // outputReport: {
              // filePath: 'checkstyle.xml',
              // formatter: require('eslint/lib/formatters/checkstyle'),
            // },
          },
        },
      }),

      new HtmlWebpackPlugin({
        title: 'Webpack demo',
      }),
    ],
  },
  parts.lintJavaScript({ include: PATHS.app }),
]);

const productionConfig = merge([
  parts.extractCSS({
    use: ['css-loader', parts.autoprefix(), 'stylus-loader'],
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
