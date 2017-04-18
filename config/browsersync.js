const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const AnsiToHTML = require('ansi-to-html');
const convert = new AnsiToHTML();

const webpackConfig = require('./webpack.config')('development');
const bundler = webpack(webpackConfig);

bundler.plugin('done', function(stats) {
  if (stats.hasErrors() || stats.hasWarnings()) {
    return browserSync.sockets.emit('fullscreen:message', {
      styles: {
        '.bs-pretty-message': [
          'width: 100%',
          'min-height: 100%',
          'display: table',
          'background-color: white',
          'color: white',
          'position: absolute',
          'font-family: Source Code Pro, Consolas, monospace',
          'top: 0',
          'left: 0',
          'opacity: 0.9',
          'box-sizing: border-box',
          'z-index: 2147483647'
        ],

        '.bs-pretty-message__wrapper': [
          'background-color: #000',
          'color: white',
          'top: 0',
          'left: 0',
          'opacity: 1',
          'padding: 1rem',
          // 'height: 100vh',
          'height: auto',
          'box-sizing: border-box'
        ],

        '.bs-pretty-message__header': [
          'font-family: "helvetica neue", helvetica, sans-serif',
          'box-sizing: border-box'
        ],

        '.bs-pretty-message__content': [
          'font-family: Source Code Pro, Consolas, monaco, monospace',
          'box-sizing: border-box'
        ]
      },
      title: 'Error:',
      body: convert.toHtml(stats.toString({ colors: true })),
      timeout: 100000
    });
  } else {
    console.log('Updating styles');
    browserSync.sockets.emit('styles:update');
  }
  // browserSync.reload();
});

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync.init({
  host: 'localhost',
  port: 3000,
  proxy: 'https://wordpress.local/',
  plugins: ['bs-fullscreen-message'],
  open: false,
  files: ['**/*.css, **/*.js, **/*.php'],
  logFileChanges: false,
  middleware: [
    webpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true }
    })
  ],
  plugins: ['bs-pretty-message', 'webpack-browser-sync-css-hmr'],
});