const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      // '*': 'http://wordpress.local'
    // }

    // proxy: {
    // '/./': {
    // target: 'https://pro-tukipiste.local',
    // secure: false,
    // },
    // },
  },
});

exports.BrowserSync = ({ proxy, open }) => ({
  // TODO: Ditch this.
  plugins: [
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        proxy: proxy || 'https://wordpress.local',
        plugins: ['bs-fullscreen-message'],
        open: open || true,
        files: ['**/*.css, **/*.js, **/*.php']
      },
      // plugin options
      {
        reload: false,
        callback: function(instance) {
          console.log(instance);
          // console.log(this);
        }
      }
    )
  ]
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
  // TODO: Maybe add copy-webpack-plugin for absolute import support
  // https://survivejs.com/webpack/styling/loading/#understanding-lookups
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: [
          'style-loader',
          'css-loader',
        ],
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
            // require('jeet') // this just doesn't work, import it in .styl files
          ],
          import: [
            // '~jeet/jeet'
          ]
        },
      },
    }),
  ],
});

exports.extractCSS = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: '[name].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.(css|styl)$/,
          include,
          exclude,
          use: plugin.extract({
            use,
            // fallback: ['css-loader', 'stylus-loader'], // enable and the world will explode
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer'),
    ]),
  },
});
