var gulp       = require('gulp');
var gutil      = require('gulp-util');
var webpack    = require('webpack');
var connect    = require('gulp-connect');
var version    = require('./package.json').version;
var rename     = require("gulp-rename");
var through2   = require('through2');
var browserify = require('browserify');


gulp.task('scriptsTest', function () {
  webpack({
    entry: './test/src/gremlins-jquery.js',
    output: {
      filename: './test/specs/gremlins-jquery.js',
    },
    module: {
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
      ]
    }
    // configuration
  }, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    //callback();
  });

//  return gulp.src('test/src/gremlins-jquery.js')
//    .pipe(through2.obj(function (file, enc, next) {
//      browserify(file.path, {
//        standalone: 'gremlinsJquery',
//        debug: false
//      })
//        .transform('babelify')
//        .bundle(function (err, res) {
//          // assumes file.contents is a Buffer
//          file.contents = res;
//          next(null, file);
//        });
//    }))
//    .pipe(gulp.dest('./test/specs'));
});

gulp.task('scripts', function () {

  webpack({
    entry: './index.js',
    output: {
      filename: './dist/gremlins-jquery.js',
      libraryTarget: "umd"
    },
    module: {
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
      ]
    },
    externals: [{
      'jquery': {
        root: '$',
        amd: 'jquery',
        commonjs: 'jquery',
        commonjs2: 'jquery'
      }
    }]
    // configuration
  }, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    //callback();
  });


//  return gulp.src('index.js')
//    .pipe(through2.obj(function (file, enc, next) {
//      browserify(file.path, {
//        standalone: 'gremlinsJquery',
//        debug: false
//      })
//        .external(['jquery'])
//        .transform('babelify')
//        .bundle(function (err, res) {
//          // assumes file.contents is a Buffer
//          file.contents = res;
//          next(null, file);
//        });
//    }))
//    .pipe(rename('gremlins-jquery.js'))
//    .pipe(gulp.dest('./dist'));
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