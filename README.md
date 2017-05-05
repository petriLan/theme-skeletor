# redandblue theme-skeleton
This is _the_ starter theme for creating a WordPress theme.

# Getting started
First, change proxydomain in `package.json`. It defaults to `https://wordpress.local`, but you'll want to change it to your projects development domain, such as `https://skeleton.local`.

Install development dependencies by running `yarn`. After it completes, start Webpack with `yarn start`. Browsersync will open a new tab in your default browser. If not, the default address for it is `https://localhost:3000`. If you have something running on 3000, it will automatically try the next port, such as 3001.

# Webfonts
Webfonts are a bit tricky. `@font-face` works, but a bit different than you might expect. Basically, you're going to want to put your declarations to `app/styl/typography.styl`, and your fonts in `app/fonts/`, but you're going to refer to them as if they were in `app/styl/fonts`:
```
@font-face {
  font-family: 'FontName';
  src: url('./fonts/FontName/weight.woff')
    format('woff');
  font-weight: 700;
}
```

# Deploying
This is a Composer package. That means that you normally require it in your projects composer.json. See [redandbluefi/skeleton](https://github.com/redandbluefi/skeleton). You don't deploy _this_ repository, you deploy the parent repository which has listed this repository as a dependency. 

If this is a private repository, you must add a deploy key to the server you wish to deploy on. https://developer.github.com/guides/managing-deploy-keys/#deploy-keys

Build is triggered automatically when `composer install` or `composer update` is ran. See composer.json. 

## Tagging
Composer won't use the master branch. Instead it uses tags. When you have something you want to deploy, commit your changes, and then run `git tag [your-version-here]`. If you are unsure what version number to use for the tag, run `git tag` to see a list of tags. Semantic versioning is just about the only versioning that makes sense, so use that. Basics of semantic versioning: **major**.**minor**.**patch**

Increment the *major* number if you introduce breaking changes. Doesn't really happen in themes.
Increment the *minor* number if you add features. 
Increment the *patch* number if you fix bugs. 

So if the current version is 0.3.1, and you add a new feature, run `git tag 0.4`.
To make the tag available for Composer, run `git push origin 0.4`. 

Then when you run `composer update` on projects that have required this theme, you should see output similar to this: 
```
- Updating redandblue/theme-skeleton (0.1 => 0.1.1):  Checking out 7e4615cfd8
```

# Developing the skeleton itself
Running `yarn start` will present you with a nice dashboard. That isn't very helpful when you're editing Webpack configation and having to manually reload your configuration every time. Use `yarn run dev` to run Webpack using Nodemon, which will automatically restart when your config changes.
