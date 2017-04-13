const webpack = require('webpack');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    // Enable history API fallback so HTML5 History API based
    // routing works. Good for complex setups.
    historyApiFallback: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || '0.0.0.0';
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080

    overlay: {
      errors: true,
      warnings: true
    },

    // proxy: {
    // '/./': {
    // target: 'https://pro-tukipiste.local',
    // secure: false,
    // },
    // },
  },
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',

        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
    ],
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.styl$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        // jeet
        stylus: {
          use: [
            // require('jeet') // this just doesn't work
          ],
          import: [
            // '~jeet/jeet'
          ]
        },
      },
    }),
  ],
});
