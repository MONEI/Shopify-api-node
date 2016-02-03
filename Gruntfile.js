module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      grunt: {
        files: ['lib/*', 'test/*'],
        tasks: 'default'
      }
    },
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      nodeFiles: {
        files: {
          src: ['lib/', 'test/']
        }
      }
    },
    mochaTest: {
      test: {
        options: {},
        src: ['test/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-force-task');

  grunt.registerTask('default', ['force:eslint', 'mochaTest', 'watch']);

};
