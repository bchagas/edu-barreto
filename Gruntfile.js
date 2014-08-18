/*global module:false*/
module.exports = function(grunt) {

	var globalConfig = {

	    src: 'dist',
	    dest: 'dev'

	};

  	// Project configuration.
  	grunt.initConfig({
	    // Metadata.
	    globalConfig: globalConfig,

	    // Task configuration.
	    uglify: {

	    	dist: {

	    		src: 'dev/js/index.js',

	    		dest: 'dev/js/index.min.js'

	    	}
	    },
	    compass: {

		    dev: {

		    	options: {

		    		sassDir: 'dev/sass',

		    		cssDir: 'dev/css'

		    	}
		    }

		},
		processhtml: {

			dist: {

				files: [{

                    expand: true,
                    cwd: 'dev/templates',
                    src: ['*.html','!footer.html', '!header.html'],
                    dest: 'dev'

				}]

			},

			dev: {

				src: 'dev/templates/index.html',

				dest: 'dev/index.html'

			}

		},
	    watch: {

	    	options: {

	    		livereload: true,
	    		nospawn: true

	    	},

	    	css: {

	    		files: ['dev/sass/*.scss'],

	    		tasks: ['compass:dev'],

				options: {

					livereload: true

				}

	    	},

	    	js: {

	    		files: ['dev/js/*.js'],

	    		tasks: ['uglify'],

				options: {

					livereload: true

				}

	    	},

	    	html: {

	    		files: ['dev/templates/*.html'],

	    		tasks: ['processhtml:dev'],

				options: {

					livereload: true

				}

	    	}

	    },
	    connect: {

	    	server:{

	    		options: {

	    			hostname: 'localhost',

	    			port: 9000,

	    			livereload: true,

	    			open: true,

	    			base: [ 'dev' ]

	    		}

	    	}
	    }
	});


	var files = {};

	grunt.event.on('watch', function(action, filepath, target) {

		var filename = filepath.match( /([^\\\/:*?\"<>|]+)$/g ),
		files = { src: filepath, dest: 'dev/' + filename }

 		grunt.config( ['processhtml', 'dev' ], files );

	});


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-processhtml');

  // Default task.
  //grunt.registerTask('default', ['concat', 'uglify', 'compass']);
  grunt.registerTask('server', ['processhtml:dist', 'connect', 'watch']);
  grunt.registerTask('dist', ['processhtml:dist', 'uglify', 'compass']);
  grunt.registerTask('build:html', ['processhtml:dist']);
  grunt.registerTask('build:dev', ['processhtml:dev']);


};
