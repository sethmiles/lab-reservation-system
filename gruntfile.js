module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['app.js', 'app/**/*.js', 'config/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true,
        }
      }
    },
    jshint: {
      all: ['gruntfile.js', 'app.js', 'app/**/*.js'],
    },
    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          watchedFolders: ['app', 'config', '.'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);
  grunt.registerTask('default', ['jshint', 'concurrent']);
};
