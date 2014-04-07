var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify')

    // Non gulp
var express = require('express'),
    spawn = require('child_process').spawn

    // Vars
var paths = {
      site: '_site',
      lessIn: '_dev/less/main.less',
      lessOut: 'css',
      jsIn: [
        '_dev/js/main.js',
      ],
      jsOut: 'js',
    }


var jekyll = function(jekyllParams) {
  return spawn('jekyll', jekyllParams).on('exit', function(e) {
    if (e > 0)
    {
      gutil.log('Jekyll error. Is jekyll installed?')
      gutil.log('`gem install jekyll`')
      throw new gutil.PluginError('jekyll', 'Jekyll error :(')
    }
  })
}


gulp.task('css', function() {
  return gulp.src(paths.lessIn)
    .pipe(less({
      paths: '',
      // compress: true,
      strictMath: true,
      cleanCss: true
    }).on('error', gutil.log))
    .pipe(gulp.dest(paths.lessOut))
})

gulp.task('js', function() {
  return gulp.src(paths.jsIn)
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest(paths.jsOut))
})

gulp.task('build', ['css', 'js'], function() {
  return jekyll(['build'])
})

gulp.task('dev', ['css', 'js'], function() {
  return jekyll(['build', '--drafts'])
})

gulp.task('default', ['css', 'js'], function() {
  var lrPort = 35729

  var j = jekyll(['build', '--watch', '--drafts'])
  j.stdout
    .on('readable', function() {
      var output = this.read().toString().trim()
      gutil.log('JEKYLL: ' + output)
      if (output === '...done.')
      {
        lr.changed({
          body: {
            files: [
              '*'
            ]
          }
        })
      }
    })

  // Jekyll doesn't seem to produce stderr
  j.stderr
    .on('readable', function() {
      gutil.log(this.read().toString().trim())
    })
    .on('end', function () {
      throw new gutil.PluginError('Jekyll error.')
    })

  express()
    .use(require('connect-livereload')(lrPort))
    .use(express.static('_site'))
    .listen(4000)

  var lr = require('tiny-lr')()
  lr.listen(lrPort)

  gulp.watch('_dev/less/**/*.{less,css}', ['css'])
  gulp.watch(paths.jsIn, ['js'])

})
