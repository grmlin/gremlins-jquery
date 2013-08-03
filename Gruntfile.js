/*jshint camelcase:false */
module.exports = function (grunt) {
  'use strict';

  var EXTENSION_NAME = "jquery";
  var coffeeObj = {},
      distObj = {};
  coffeeObj['dist/gremlin.'+EXTENSION_NAME+'.js'] = ['src/'+EXTENSION_NAME+'.coffee'];
  distObj['dist/gremlin.'+EXTENSION_NAME+'.min.js'] = ['dist/gremlin.'+EXTENSION_NAME+'.js'];
  
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  //
  // Grunt configuration:
  //
  //
  grunt.initConfig({
    coffee: {
      extension: {
        options: {
          bare: false,
          sourceMap: true
        },
        files: coffeeObj
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
        compress: true,
        report: 'gzip',
        wrap: false
      },
      dist: {
        files: distObj
      }
    },
    clean: {
      extension: ["dist/*"]
    },
    pkg: grunt.file.readJSON('package.json')
  });


  // Create shortcuts to main operations.
  //grunt.registerTask('server', ['docs', 'connect:gremlinjs', 'watch:docs']);

  // the default task, when 'grunt' is executed with no options.
  grunt.registerTask('default', ['clean', 'coffee', 'uglify']);

};

