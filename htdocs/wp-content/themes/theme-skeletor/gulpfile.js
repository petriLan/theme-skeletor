/* Includes */

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const stylus = require('gulp-stylus');
const minifyCSS = require('gulp-minify-css');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pxtorem = require('gulp-pxtorem');
const runSequence = require('run-sequence');
const config = require('./config.json');
const criticalCss = require('gulp-penthouse');

var env = process.env.NODE_ENV;
const siteUrl = env === 'development' ? config.DEV_URL : config.SITE_URL;

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
				'node_modules/vanilla-lazyload/dist/lazyload.min.js',
				'app/js/skip-link-focus-fix.js',
				'app/js/lazyload.js',
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

assets.css.forEach(function(asset) {
	gulp.task(asset.taskName, function() {
		return gulp
			.src(asset.src)
			.pipe(plumber())
			.pipe(
				stylus({
					'include css': true
				})
			)
			.pipe(autoprefixer('last 3 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
			.pipe(
				pxtorem({
					replace: true,
					propList: [ '*' ],
					mediaQuery: false
				})
			)
			.pipe(minifyCSS())
			.pipe(gulp.dest(asset.dest))
	});
});

assets.js.forEach(function(asset) {
	gulp.task(asset.taskName, function() {
		return gulp.src(asset.src, {allowEmpty:true}).pipe(concat(asset.buildName)).pipe(uglify()).pipe(gulp.dest(asset.dest));
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
gulp.task('critical-css', function() {
	return gulp
		.src('./build/client.css')
		.pipe(
			criticalCss({
				out: '/critical.css',
				url: siteUrl, // url from where we want penthouse to extract critical styles
				width: 1400, // max window width for critical media queries
				height: 900, // max window height for critical media queries
				userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' // pretend to be googlebot when grabbing critical page styles.
			})
		)
		.pipe(minifyCSS())
		.pipe(gulp.dest('./build/'));
});


/* Watch */

gulp.task('watch', gulp.series(function() {
	assets.css.forEach(function(asset) {
    browserSync.init({
			proxy: siteUrl,
			host: 'localhost',
			open: 'local',
			port: 3000,
			https: true
		});
    
		gulp.watch(asset.watch, gulp.series(asset.taskName));
	});

	gulp.watch('app/**/*.js', gulp.series(jsTasks, function(done) {
		done();
	}));

	gulp.watch(assets.fonts.src, gulp.series('fonts'));
  
  gulp.watch('./build/*.css').on('change', browserSync.reload);
	gulp.watch('./build/*.js').on('change', browserSync.reload);
}));

gulp.task('build', gulp.series(cssTasks, jsTasks, imageTasks, 'fonts', 'critical-css'));

gulp.task('dev', gulp.series('build', 'watch'));

gulp.task('default', gulp.series('dev'));
