module.exports = function(grunt) {
	require('jit-grunt')(grunt, {
		replace: 'grunt-text-replace',
		sass: 'grunt-sass'
	});
	require('time-grunt')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		src: {
		    src:'assets',
		    scss:'assets/scss',
		    css:'assets/css',
		    js:'assets/js',
		    img:'assets/images',
		},
		dist: {
			dist:'dist'
		},

		///// ## SASS ## \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		sass: {
			src: {
				options: {
				sourceMap: true,
				outputStyle: 'expanded',
				sourceComments: true
				},
				files: [{
					  expand: true,     // Enable dynamic expansion.
					  cwd: '<%= src.scss %>/',      // Src matches are relative to this path.
					  src: ['style.scss'], // Actual pattern(s) to match.
					  dest: '<%= src.css %>/',   // Destination path prefix.
					  ext: '.css'   // Dest filepaths will have this extension.
					  // extDot: 'last'   // Extensions in filenames begin after the first dot
				}]
			}
		},

		"dr-svg-sprites": {
	        options: {
	        	spriteElementPath: "<%= src.img %>/",
			    spritePath: "<%= src.img %>/sprite.svg",
			    // template: "components/extendStylesheet.hbs",
				layout: "packed",
				cssIncludeElementSizes: 'false',
				cssPath: "<%= src.scss %>/partials",
				// cssPngPrefix: '.no-svg',
				cssPrefix: "_ui",
				cssSuffix: "scss",
				// cssUnit: "px",
				unit: 18,
				// previewPath: "assets/images",
				// map: function (name) {
				// 	return name.split().reverse().join();
				// },
				// selector: function (filename, tokens) {
				// 	var parts = [filename];
				// 	if (tokens.prefix) {
				// 		parts.unshift(tokens.prefix);
				// 	}
				// 	if (tokens.size) {
				// 		parts.push(tokens.size);
				// 	}
				// 	return "" + parts.join("-");
				// },
	        },
	        icons: {
	        	options: {

	        	}
	        }
	    },


		///// ## REPLACE ## \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		replace: {
			spritePath: {
				src: ['<%= src.scss %>/partials/_ui-icons-sprite.scss'],
				dest: '<%= src.scss %>/partials/',
				replacements: [{
					from: '../../',
					to: '../'
				}]
			}
		},

	});

	// Sprites
	grunt.registerTask('build-sprites', function(){
		grunt.task.run('dr-svg-sprites', 'replace:spritePath');
	});
};
