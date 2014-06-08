

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
             'bower_components/moment/min/moment.min.js'
             'public/js/vendor/handlebars.runtime.min.js'
             # 'bower_components/jquery-ui/ui/minified/jquery-ui.min.js'
             'bower_components/elasticsearch/elasticsearch.min.js'
          ]
    cssmin :
      combine :
        files :
          'public/css/dist/build.min.css' : ['public/css/lib/**/*.css']
          'public/css/dist/vendor.min.css' : [ #add what bower components you want to use here
            'bower_components/bootstrap/dist/css/bootstrap.css'
            # 'bower_components/jquery-ui/themes/base/minified/jquery-ui.min.css'
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
    handlebars :
      all :
        files : 'public/js/templates/templates.js' : ['public/js/templates/**/*.handlebars']        
    jade :
      compile :
        options :
          client : true
          data :
            debug : false
        files :
          'public/js/dist/templates.js' : ['public/templates/**/*.jade']
    #watch
    watch :
      client :
        files : 'public/js/src/**/*.coffee'
        tasks : ['coffee']

      server :
        files : 'src/**/*.coffee'
        tasks : ['coffee']

      css :
        files : 'public/css/src/**/*.styl'
        tasks : ['stylus']

      templates :
        files : 'public/templates/**/*.jade'
        tasks : ['jade.compile']

    nodemon :
      app :
        script: 'lib/app.js'
        options :
          watch : ['lib/**/*.js']
          ignore: ['node_modules/**']

    shell :
      elasticSearch :
        options :
          stdout : false
        command : './elasticsearch/bin/elasticsearch'
      jasmine :
        options :
          stdout : true
        command : 'cd lib/tests && jasmine-node .'
    # Jasmine tests
    jasmine:
        pivotal:
            src: 'src/**/*.js'
            options:
                specs: 'lib/tests/*_spec.js'
    concurrent :
      dev :
        tasks : ['watch', 'jade', 'nodemon:app']
        options :
          logConcurrentOutput : true


  # Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-handlebars-compiler')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-concurrent')
  grunt.loadNpmTasks('grunt-shell')
  grunt.loadNpmTasks('grunt-contrib-jade')

  # Default task(s).
  grunt.registerTask('default', ['stylus', 'coffee', 'cssmin', 'handlebars', 'concurrent:dev'])
  grunt.registerTask('build', ['uglify', 'cssmin'])
  grunt.registerTask('test',['shell:jasmine'])
