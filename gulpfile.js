var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade')

var express = require('express')

var paths = {
      site: '_site',
      posts: '_posts/**/*.jade',
      layouts: '_layouts/**/*.jade',
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
    }


gulp.task('css', function() {
  return gulp.src(paths.less.in)
    .pipe(less({
      paths: '',
      // compress: true,
      strictMath: true,
      cleanCss: true
    }).on('error', gutil.log))
    .pipe(gulp.dest(paths.less.out))
})


gulp.task('js', function() {
  return gulp.src(paths.js.in)
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest(paths.js.out))
})


gulp.task('build', function() {
  // var tpl = jade.compileFile(templates.post)

  return gulp.src(paths.posts)
    .pipe(jade())
    .pipe(gulp.dest(paths.site))
})


/**
* tests
* @todo: write some tests
*  [ ] html
*  [ ] js
*  [ ] css
*/
gulp.task('test', ['build'], function() {})

/**
* Default task
* build & watch
* used for local dev
*/
gulp.task('default', ['css', 'js', 'build'], function() {
  var lrPort = 35729
  var lr = require('tiny-lr')()
  lr.listen(lrPort)

  express()
    .use(require('connect-livereload')(lrPort))
    .use(express.static('_site'))
    .listen(4000)

  gulp.watch(paths.js.in, ['js'])
  gulp.watch([paths.posts, paths.layouts], ['build'])
})
