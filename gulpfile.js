var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade');

var express = require('express');

var paths = {
      site: '_site',
      blog: '_site/blog',
      posts: '_posts/**/*.jade',
      pages: '_pages/**/*.jade',
      static: '_static/**/*',
      layouts: '_layouts/**/*.jade',
      includes: '_includes/**/*.jade',
      less: {
        in: '_dev/less/main.less',
        out: 'css'
      },
      js: {
        in: [
          '_dev/js/main.js',
        ],
        out: 'js'
      }
    };


gulp.task('css', function() {
  return gulp.src(paths.less.in)
    .pipe(less({
      paths: '',
      // compress: true,
      strictMath: true,
      cleanCss: true
    }).on('error', gutil.log))
    .pipe(gulp.dest(paths.less.out));
});


gulp.task('js', function() {
  return gulp.src(paths.js.in)
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest(paths.js.out));
});


gulp.task('build', ['build:posts', 'build:pages', 'copy']);

gulp.task('build:posts', function() {
  return gulp.src(paths.posts)
    .pipe(jade())
      .on('error', function(e) {console.log(e);})
    .pipe(gulp.dest(paths.blog));
});

gulp.task('build:pages', function() {
  return gulp.src(paths.pages)
    .pipe(jade())
      .on('error', function(e) {console.log(e);})
    .pipe(gulp.dest(paths.site));
});

gulp.task('copy', function() {
  return gulp.src(paths.static)
    .pipe(gulp.dest(paths.site));
});


/**
* tests
* @todo: write some tests
*  [ ] html
*  [ ] js
*  [ ] css
*/
gulp.task('test', ['build'], function() {});

/**
* Default task
* build & watch
* used for local dev
*/
gulp.task('default', ['css', 'js', 'build'], function() {
  var lrPort = 35729;
  var lr = require('tiny-lr')();
  lr.listen(lrPort);

  express()
    .use(require('connect-livereload')(lrPort))
    .use(express.static('_site'))
    .listen(4000);

  gulp.watch(paths.js.in, ['js']);
  gulp.watch(paths.pages, function(e) {
    console.log(e);
    gulp.start('build:pages');
    lr.changed({
      body: {
        files: [
          '*'
        ]
      }
    });
  });
  gulp.watch(paths.posts, function(e) {
    console.log(e);
    gulp.start('build:posts');
    lr.changed({
      body: {
        files: [
          '*'
        ]
      }
    });
  });
  gulp.watch([paths.layouts, paths.includes], function(e) {
    gulp.start('build');
    lr.changed({
      body: {
        files: [
          '*'
        ]
      }
    });
  });
});
