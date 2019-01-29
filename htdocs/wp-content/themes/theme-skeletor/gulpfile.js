/* Includes */

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const stylus = require("gulp-stylus");
const minifyCSS = require("gulp-minify-css");
const plumber = require("gulp-plumber");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const pxtorem = require("gulp-pxtorem");
const runSequence = require("run-sequence");
const jeet = require("jeet");
const config = require("./config.json");

const siteUrl = config.SITE_URL;

/* File paths */

const assets = {
  css: [
    {
      taskName: "styles.client",
      watch: "app/**/*.styl",
      src: "app/client.styl",
      dest: "build"
    },
    {
      taskName: "styles.editor",
      watch: "app/**/*.styl",
      src: "app/editor.styl",
      dest: "build"
    },
    {
      taskName: "styles.admin",
      watch: "app/**/*.styl",
      src: "app/admin.styl",
      dest: "build"
    }
  ],
  js: [
    {
      taskName: "js.client",
      buildName: "client.js",
      watch: "app/**/*.js",
      src: [
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/vanilla-lazyload/dist/lazyload.min.js",
        "app/js/skip-link-focus-fix.js",
        "app/js/lazyload.js",
        "app/client.js"
      ],
      dest: "build"
    },
    {
      taskName: "js.editor",
      buildName: "editor.js",
      watch: "app/**/*.js",
      src: "app/editor.js",
      dest: "build"
    },
    {
      taskName: "js.admin",
      buildName: "admin.js",
      watch: "app/**/*.js",
      src: "app/admin.js",
      dest: "build"
    }
  ],
  images: [
    {
      taskName: "images",
      src: "app/img/*",
      dest: "build/img"
    }
  ],
  php: {
    watch: "**/*.php"
  },
  fonts: {
    src: "app/fonts/**",
    dest: "build/fonts"
  }
};

const cssTasks = assets.css.map(asset => asset.taskName);
const jsTasks = assets.js.map(asset => asset.taskName);
const imageTasks = assets.images.map(asset => asset.taskName);

assets.css.forEach(function(asset) {
  gulp.task(asset.taskName, function() {
    return gulp
      .src(asset.src)
      .pipe(plumber())
      .pipe(
        stylus({
          use: [jeet()],
          "include css": true
        })
      )
      .pipe(
        autoprefixer(
          "last 3 version",
          "safari 5",
          "ie 9",
          "opera 12.1",
          "ios 6",
          "android 4"
        )
      )
      .pipe(
        pxtorem({
          replace: true,
          propList: ["*"],
          mediaQuery: false
        })
      )
      .pipe(minifyCSS())
      .pipe(gulp.dest(asset.dest))
      .pipe(browserSync.stream());
  });
});

assets.js.forEach(function(asset) {
  gulp.task(asset.taskName, function() {
    return gulp
      .src(asset.src)
      .pipe(concat(asset.buildName))
      .pipe(uglify())
      .pipe(gulp.dest(asset.dest));
  });
});

assets.images.forEach(function(asset) {
  gulp.task(asset.taskName, function() {
    return gulp
      .src(asset.src)
      .pipe(imagemin())
      .pipe(gulp.dest(asset.dest));
  });
});

gulp.task("fonts", function() {
  return gulp.src(assets.fonts.src).pipe(gulp.dest(assets.fonts.dest));
});

/* BrowserSync */

gulp.task("browsersync", function() {
  browserSync.init({
    proxy: siteUrl,
    open: false
  });
});

gulp.task("bs-reload", function() {
  browserSync.reload();
});

/* Watch */

gulp.task("watch", ["browsersync"], function() {
  assets.css.forEach(function(asset) {
    gulp.watch(asset.watch, [asset.taskName]);
  });

  gulp.watch("app/**/*.js", function(cb) {
    runSequence(...jsTasks, "bs-reload");
  });

  assets.images.forEach(function(asset) {
    gulp.watch(asset.watch, [asset.taskName, "bs-reload"]);
  });

  gulp.watch(assets.fonts.src, ["fonts", "bs-reload"]);

  gulp.watch(assets.php.watch, ["bs-reload"]);
});

gulp.task("build", function(cb) {
  runSequence(...cssTasks, ...jsTasks, ...imageTasks, "fonts", cb);
});

gulp.task("dev", function(cb) {
  runSequence("build", "watch");
});

gulp.task("default", ["dev"]);
