/* Includes */

const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const stylus = require('gulp-stylus');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pxtorem = require('gulp-pxtorem');
const config = require('./config.json');
const criticalCss = require('gulp-penthouse');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const through2 = require('through2');

const touch = () =>
	through2.obj(function(file, enc, cb) {
		if (file.stat) {
			file.stat.atime = file.stat.mtime = file.stat.ctime = new Date();
		}
		cb(null, file);
	});

var env = process.env.NODE_ENV;
const siteUrl = env === 'development' ? config.DEV_URL : config.SITE_URL;
const map = env === 'development' ? true : false;

/* File paths */

const assets = {
	css: [
		{
			taskName: 'styles.client',
			watch: 'app/**/*.styl',
			src: 'app/client.styl',
			dest: 'build'
		},
		{
			taskName: 'styles.editor',
			watch: 'app/**/*.styl',
			src: 'app/editor.styl',
			dest: 'build'
		},
		{
			taskName: 'styles.admin',
			watch: 'app/**/*.styl',
			src: 'app/admin.styl',
			dest: 'build'
		}
	],
	js: [
		{
			taskName: 'js.client',
			buildName: 'client.js',
			watch: 'app/**/*.js',
			src: [
				'app/js/skip-link-focus-fix.js',
				'app/client.js',
				'app/js/**/*.js'
			],
			dest: 'build'
		},
		{
			taskName: 'js.editor',
			buildName: 'editor.js',
			watch: 'app/**/*.js',
			src: 'app/editor.js',
			dest: 'build'
		},
		{
			taskName: 'js.admin',
			buildName: 'admin.js',
			watch: 'app/**/*.js',
			src: 'app/admin.js',
			dest: 'build'
		}
	],
	images: [
		{
			taskName: 'images',
			src: 'app/img/*',
			dest: 'build/img'
		}
	],
	php: {
		watch: '**/*.php'
	},
	fonts: {
		src: 'app/fonts/**',
		dest: 'build/fonts'
	}
};

const cssTasks = assets.css.map((asset) => asset.taskName);
const jsTasks = assets.js.map((asset) => asset.taskName);
const imageTasks = assets.images.map((asset) => asset.taskName);
const criticalTasks = Object.keys(themeVariables.critcalTypes).map((key) => key);

assets.css.forEach(function(asset) {
	gulp.task(asset.taskName, function() {
		return gulp
			.src(asset.src)
			.pipe(plumber())
			.pipe(gulpif(map, sourcemaps.init()))
			.pipe(
				stylus({
					'include css': true
				})
			)
			.pipe(
				pxtorem({
					replace: true,
					propList: [
						'*'
					],
					mediaQuery: false
				})
			)
			.pipe(gulpif(map, sourcemaps.write('.')))
			.pipe(gulp.dest(asset.dest));
	});
});

assets.js.forEach(function(asset) {
	gulp.task(asset.taskName, function() {
		return gulp
			.src(asset.src, { allowEmpty: true })
			.pipe(gulpif(map, sourcemaps.init()))
			.pipe(concat(asset.buildName))
			.pipe(
				babel({
					presets: [
						'@babel/env'
					]
				})
			)
			.pipe(uglify())
			.pipe(gulpif(map, sourcemaps.write('.')))
			.pipe(touch())
			.pipe(gulp.dest(asset.dest));
	});
});

assets.images.forEach(function(asset) {
	gulp.task(asset.taskName, function() {
		return gulp.src(asset.src).pipe(imagemin()).pipe(gulp.dest(asset.dest));
	});
});

gulp.task('fonts', function() {
	return gulp.src(assets.fonts.src).pipe(gulp.dest(assets.fonts.dest));
});

/* Critical css */
Object.keys(themeVariables.critcalTypes).forEach(function(key) {
	gulp.task(key, function() {
		return gulp
			.src('./build/client.css')
			.pipe(plumber())
			.pipe(
				criticalCss({
					out: themeVariables.critcalTypes[key].output,
					url: siteUrl + themeVariables.critcalTypes[key].path, // url from where we want penthouse to extract critical styles
					width: themeVariables.critcalTypes[key].width, // max window width for critical media queries
					height: themeVariables.critcalTypes[key].height, // max window height for critical media queries
					userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', // pretend to be googlebot when grabbing critical page styles.
					forceInclude: themeVariables.critcalTypes[key].includeCss,
					phantomJsOptions: {
						'ssl-protocol': 'any'
					},
					blockJSRequests: true
				})
			)
			.pipe(cleanCSS())
			.pipe(touch())
			.pipe(gulp.dest('./build/'));
	});
});

/* Minify client.css - this must do after critical to avooid errors in critical */
gulp.task('minify-client-css', function () {
	return gulp.src('./build/client.css')
		.pipe(plumber())
		.pipe(cleanCSS())
		.pipe(autoprefixer('last 2 version', '>1%'))
		.pipe(touch())
    .pipe(gulp.dest('./build/'));
});

/* Watch */
gulp.task(
	'watch',
	gulp.series(function() {
		browserSync.init({
			proxy: siteUrl,
			host: 'localhost',
			open: 'local',
			port: 3000,
			https: true
		});

		assets.css.forEach(function(asset) {
			gulp.watch(asset.watch, gulp.series(asset.taskName));
		});

		gulp.watch(
			'app/**/*.js',
			gulp.series(jsTasks, function(done) {
				done();
			})
		);

		gulp.watch(assets.fonts.src, gulp.series('fonts'));

		gulp.watch('./build/*.css').on('change', browserSync.reload);
		gulp.watch('./build/*.js').on('change', browserSync.reload);
	})
);

gulp.task('build', gulp.series(cssTasks, jsTasks, imageTasks, 'fonts', criticalTasks, 'minify-client-css'));

gulp.task('dev', gulp.series('build', 'watch'));

gulp.task('default', gulp.series('dev'));
