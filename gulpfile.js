var gulp       = require('gulp');
var gutil      = require('gulp-util');
var webpack    = require('webpack');
var connect    = require('gulp-connect');
var version    = require('./package.json').version;
var rename     = require("gulp-rename");
var through2   = require('through2');
var browserify = require('browserify');
var babel = require('gulp-babel');

gulp.task("babel", function () {
  return gulp.src("src/**/*.js")
      .pipe(babel())
      .pipe(gulp.dest("lib"));
});

gulp.task('scriptsTest', ['babel'], function () {
  webpack({
    entry: './test/src/gremlins-jquery.js',
    output: {
      filename: './test/specs/gremlins-jquery.js',
    },
  }, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log('[webpack]', stats.toString({
      colors: true,
      timings: true,
      chunkModules: false,
    }));
    //callback();
  });

});

gulp.task('connect', function () {
  connect.server({
    root: ['test'],
    port: 8000,
    livereload: false
  });
});

gulp.task("reload", function () {
  gulp.src('lib/index.js')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['src/index.js', 'test/src/*.*'], ['scriptsTest', 'reload']);
});

gulp.task('default', ['connect', 'scriptsTest', 'watch']);