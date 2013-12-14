/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    // CLEAN
    clean: [
      '_site',
      '_validation'
    ],

    jshint: {
      options: {
        jshintrc: '_config/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['_compass/js/*.js']
      },
    },

    concat: {
      options: {
        stripBanners: false
      },
      dist: {
        src: [
          '_compass/js/scale.fix.js'
        ],
        dest: './js/main.js'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some',
        report: 'min'
      },
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: './js/main.min.js'
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: ["fonts/*"],
        dest: 'dist/'
      }
    },

    connect: {
      server: {
        options: {
          port: 4000,
          base: '_site'
        }
      }
    },

    jekyll: {
      options: {
        bundleExec: true,
        src: '.'
      },
      dist: {
        dest: '_site'
      }
    },

    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        path: '_validation/validation-status.json',
        reportpath: '_validation/validation-report.json',
        reset: true,
        relaxerror: [
          "Bad value X-UA-Compatible for attribute http-equiv on element meta.",
          "Element img is missing required attribute src.",
          "Bad value google-translate-customization for attribute name on element meta: Keyword google-translate-customization is not registered.",
        ]
      },
      files: {
        src: ["<%= jekyll.dist.dest %>/**/*.html"]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'dist-js', 'jekyll']
      },
      sass: {
        files: [
          '<%= compass.dist.options.sassDir %>/**/*.scss',
          '<%= compass.dist.options.sassDir %>/**/*.sass',
        ],
        tasks: ['dist-css', 'jekyll']
      },
      jekyll: {
        files: [
          '**/*.html',
          '_data/**/*',
          '_drafts/**/*',
          '_includes/**/*',
          '_layouts/**/*',
          '_posts/**/*',
          'fonts/**/*',
          'humans.txt',
          'img/**/*',
          'robots.txt',
          'sitemap.xml',
          '!_site/*'
        ],
        tasks: ['jekyll']
      }
    },

    compass: {
      dist: {
        options: {
          config: '_config/config.rb',
          sassDir: '_compass/sass'
        }
      }
    },

    concurrent: {
      t1: ['connect:server:keepalive', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: '*',
        report: 'min'
      },
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      }
    }

  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-jekyll');

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll', 'validation']);

  // Serve the site
  grunt.registerTask('serve', ['dist', 'concurrent']);

  // Test task.
  grunt.registerTask('test', ['dist-css', 'jshint:src', 'validate-html']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['compass', 'cssmin']);

  // Fonts distribution task.
  grunt.registerTask('dist-fonts', ['copy']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-fonts', 'dist-js', 'jekyll']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist']);

};
