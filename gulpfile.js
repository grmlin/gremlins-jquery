var gulp = require('gulp');
var connect = require('gulp-connect');
var version = require('./package.json').version;
var rename = require("gulp-rename");
var through2 = require('through2');
var browserify = require('browserify');


gulp.task('scriptsTest', function () {
	return gulp.src('test/src/gremlins-jquery.js')
		.pipe(through2.obj(function (file, enc, next) {
			browserify(file.path, {
				standalone: 'gremlinsJquery',
				debug: false
			})
				.transform('babelify')
				.bundle(function (err, res) {
					// assumes file.contents is a Buffer
					file.contents = res;
					next(null, file);
				});
		}))
		.pipe(gulp.dest('./test/specs'));
});

gulp.task('scripts', function () {
	return gulp.src('index.js')
		.pipe(through2.obj(function (file, enc, next) {
			browserify(file.path, {
				standalone: 'gremlinsJquery',
				debug: false
			})
				.transform('babelify')
				.bundle(function (err, res) {
					// assumes file.contents is a Buffer
					file.contents = res;
					next(null, file);
				});
		}))
		.pipe(rename('gremlins-jquery.js'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('connect', function () {
	connect.server({
		root: ['test'],
		port: 8000,
		livereload: false
	});
});

gulp.task("reload", function () {
	gulp.src('lib/watched.js')
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['index.js', 'test/src/*.*'], ['scriptsTest', 'reload']);
});

gulp.task('default', ['connect', 'scriptsTest', 'watch']);