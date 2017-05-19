const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pjson = require(path.join(__dirname, '..', 'package.json'));

// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// const NpmInstallPlugin = require('npm-install-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Imagemin = require('imagemin-webpack-plugin').default;

const parts = require('./webpack.parts');
const PATHS = {
  app: path.join(__dirname, '..', 'app'),
  build: path.join(__dirname, '..', 'build'),
};

const commonConfig = merge([
  {
    entry: {
      client: path.join(PATHS.app, 'client'),
      editor: path.join(PATHS.app, 'editor'),
      admin: path.join(PATHS.app, 'admin'),
    },
    output: {
      path: PATHS.build,
      filename: '[name].[hash].js', // We have no HMR for JS, so might as well use hashes all the time.
      publicPath: pjson.locationFromRoot,
    },
    target: 'web',
    node: {
      fs: 'empty',
    },
    plugins: [
      new CaseSensitivePathsPlugin(), // complain about capitalisation
      // new NpmInstallPlugin(), // install dependencies automatically
      new FriendlyErrorsWebpackPlugin(), // Webpack is mean by default
      // new NyanProgressPlugin(), // Show progress
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
      new CopyWebpackPlugin([
        {
          from: 'app/img',
          to: 'img',
          transform: (content) => {
            return content;
          },
        },
        {
          from: 'app/img/**/*',
          to: 'img/',
        },
      ]),
      new Imagemin({

      }),

      // new HtmlWebpackPlugin({
      // title: 'Webpack demo',
      // }),
    ],
  },
  parts.lintJavaScript({ include: PATHS.app }),
  parts.transpileJavaScript(),
  parts.loadImages(),
  parts.loadFonts({
    options: {
      name: '[name].[ext]',
    },
  }),
]);

const productionConfig = merge(
  [
    parts.extractCSS({
      use: ['css-loader', parts.autoprefix(), 'stylus-loader'],
    }),
    parts.generateSourceMaps({ type: 'hidden-source-map' }),
    {
      plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.HashedModuleIdsPlugin(),
      ],
    },
  ]
);


const developmentConfig = merge([
  {
    plugins: [
      // new DashboardPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
  },
  parts.extractCSS({
    filename: '[name].css',
    use: ['css-loader', parts.autoprefix(), 'stylus-loader'],
  }),
  parts.generateSourceMaps({ type: 'cheap-module-source-map' }),
]);

module.exports = (env) => {
  if (env === 'production') {
    console.log('Running in production mode');
    return merge(commonConfig, productionConfig);
  }

  console.log('Running in development mode');
  return merge(commonConfig, developmentConfig);
};
