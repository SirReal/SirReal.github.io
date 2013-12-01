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
      '_site'
    ],

    jshint: {
      options: {
        jshintrc: 'config/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['compass/js/*.js']
      },
    },

    concat: {
      options: {
        stripBanners: false
      },
      dist: {
        src: [],
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
        src: '.'
      },
      dist: {
        dest: '_site'
      }
    },

    validation: {
      options: {
        reset: true,
        doctype: 'HTML5',
        charset: 'utf-8',
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
      js: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src']
      },
      sass: {
        files: '<%= compass.dist.options.sassDir %>',
        tasks: ['compass:dist']
      },
      jekyll: {
        files: [
          '_data/**/*',
          '_drafts/**/*',
          '_includes/**/*',
          '_layouts/**/*',
          '_posts/**/*',
          'css/**/*',
          'fonts/**/*',
          'img/**/*',
          'js/**/*'
        ]
      }
    },

    compass: {
      dist: {
        options: {
          config: 'config/config.rb',
          sassDir: 'compass/sass'
        }
      }
    }

  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-jekyll');

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll', 'validation']);

  // Serve the site
  grunt.registerTask('serve', ['connect:server:keepalive']);

  // Test task.
  grunt.registerTask('test', ['dist-css', 'jshint', 'validate-html']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['compass']);

  // Fonts distribution task.
  grunt.registerTask('dist-fonts', ['copy']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-fonts', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist']);

};
