const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const pjson = require(path.join(__dirname, '..', 'package.json'));

// devServer doesn't work yet!
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
    host: host || process.env.HOST, // Defaults to `localhost`
    port: port || process.env.PORT, // Defaults to 8080

    overlay: {
      errors: true,
      warnings: true,
    },
    proxy: [
      {
        path: '/*',
        target: pjson.proxydomain,
        secure: false,
      },
    ],
    publicPath: pjson.locationFromRoot,
  },
});

exports.transpileJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
});

exports.lintJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        include,
        exclude,

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
          ],
        },
      },
    }),
  ],
});

exports.extractCSS = ({ filename, include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: filename || '[name].[hash].css',
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

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,

        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer'),
    ]),
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.loadImages = () => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(jpg|png|gif|JPG|PNG|GIF)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
        },
      },
    ],
  },
});
