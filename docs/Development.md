# Development

Modify `htdocs/wp-content/themes/theme-skeletor/config.json` and set the site URL for Browsersync. Use the same URL you're running the WordPress on.

Install development dependencies by running `npm install`.

Finally run `npm run dev` to run build and Browsersync. The browser tab doesn't open automatically so just head to the `https://localhost:3000`. If you have something running on 3000, it will automatically try the next port, such as 3001.

## Webfonts

Webfonts are a bit tricky. `@font-face` works, but a bit different than you might expect. Basically, you're going to want to put your declarations to `app/styl/typography.styl`, and your fonts in `app/fonts/`, but you're going to refer to them as if they were in `app/styl/fonts`:

```
@font-face {
  font-family: 'FontName';
  src: url('./fonts/FontName/weight.woff')
    format('woff');
  font-weight: 700;
}
```

### Import / export initial database

> Recommend doing this: `alias wpd='docker-compose run --rm wp-cli'`

Export (example): `wpd db export - > duodecim-2018-08-16.sql`
Import (example): `cat duodecim-2018-08-16.sql | wpd db import -`

### Tagging

Composer won't use the master branch. Instead it uses tags. When you have something you want to deploy, commit your changes, and then run `git tag [your-version-here]`. If you are unsure what version number to use for the tag, run `git tag` to see a list of tags. Semantic versioning is just about the only versioning that makes sense, so use that. Basics of semantic versioning: **major**.**minor**.**patch**

Increment the _major_ number if you introduce breaking changes. Doesn't really happen in themes.
Increment the _minor_ number if you add features.
Increment the _patch_ number if you fix bugs.

So if the current version is 0.3.1, and you add a new feature, run `git tag 0.4`.
To make the tag available for Composer, run `git push origin 0.4`.

Then when you run `composer update` on projects that have required this theme, you should see output similar to this:

```
- Updating redandblue/theme-skeleton (0.1 => 0.1.1):  Checking out 7e4615cfd8
```
