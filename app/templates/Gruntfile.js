'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      options: { style: 'expanded' },
      dist: { files: { 'assets/css/main.css': 'assets/sass/main.scss' } }
    },

    <% if (includeJade) { %>jade: {
      compile: {
        files: [{
          src: ['*.jade'],
          cwd: 'jade',
          dest: './',
          ext: '.html',
          expand: true
        }]
      }
    },<% } %>

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/scripts/*.js'
      ]
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      
      <% if (includeJade) { %>jade: {
        files: 'jade/*.jade',
        tasks: ['jade']
      },<% } %>

      livereload: {
        options: { livereload: true },
        files: ['assets/css/*.css', 'assets/js/*.js', '*.html']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch'); <% if (includeJade) { %>
  grunt.loadNpmTasks('grunt-contrib-jade'); <% } %>

  // Default tasks.
  grunt.registerTask('default', ['sass', <% if(includeJade){ %>'jade',<% } %> 'watch']); 
};

