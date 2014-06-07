
module.exports = (grunt) ->
  grunt.initConfig

    pkg : grunt.file.readJSON('package.json')

    uglify :
      build :
        files :
          'public/js/dist/build.min.js' : ['public/js/lib/**/*.js']
          'public/js/dist/vendor.min.js' : [ #add what bower components you want to use here
             'bower_components/jquery/dist/jquery.min.js'
             'bower_components/bootstrap/dist/js/bootstrap.min.js'
             'bower_components/underscore/underscore.js'
             'bower_components/momentjs/min/moment.min.js'
             'public/js/vendor/handlebars.runtime.min.js'
          ] 
    cssmin :
      combine :
        files : 
          'public/css/dist/build.min.css' : ['public/css/lib/**/*.css']
          'public/css/dist/vendor.min.css' : [ #add what bower components you want to use here
            'bower_components/bootstrap/dist/css/bootstrap.css'
          ]

    coffee :
      client :
        expand : true
        cwd : 'public/js/src'
        src : ['**/*.coffee']
        dest : 'public/js/lib'
        ext : '.js'
      server : 
        expand : true
        cwd : 'src'
        src : ['**/*.coffee']
        dest : 'lib'
        ext : '.js'

    stylus :
      css :
        expand : true
        cwd : 'public/css/src'
        src : ['**/*.styl']
        dest : 'public/css/lib'
        ext : '.css'

    #watch 
    watch :
      client :
        files : '**/*.coffee'
        tasks : ['coffee']
      server :
        files : '**/*.coffee'
        tasks : ['coffee']
      css :
        files : '**/*.styl'
        tasks : ['stylus']
    
    concurrent :
      dev : 
        tasks : ['nodemon', 'watch']
        options : 
          logConcurrentOutput : true

    nodemon : 
      dev : 
        script: 'lib/app.js',
      options : 
        env : 
          PORT : '3000'
  

  # Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-concurrent')

  # Default task(s).
  grunt.registerTask('default', ['stylus', 'coffee', 'uglify', 'cssmin', 'concurrent:dev'])
  grunt.registerTask('build', ['uglify', 'cssmin'])

