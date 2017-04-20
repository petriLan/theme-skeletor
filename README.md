# redandblue theme-skeleton
This is _the_ starter theme for creating a WordPress theme.

# Getting started
Install development dependencies by running `yarn`. After it completes, start Webpack with `yarn start`. Browsersync will open a new tab in your default browser. If not, the default address for it is `https://localhost:3000`. If you have something running on 3000, it will automatically try the next port, such as 3001.

# Developing the skeleton itself
Running `yarn start` will present you with a nice dashboard. That isn't very helpful when you're editing Webpack configation and having to manually reload your configuration every time. Use `yarn run dev` to run Webpack using Nodemon, which will automatically restart when your config changes.
