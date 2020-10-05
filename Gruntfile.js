module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // we could just concatenate everything, really
        // but we like to have it the complex way.
        // also, in this way we do not have to worry
        // about putting files in the correct order
        // (the dependency tree is walked by r.js)
        less: {
            dist: {
                options: {
                    paths: [],
                    strictMath: false,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'styles.css.map',
                    sourceMapFilename: 'styles.css.map'
                },
                files: {
                    'styles.css': 'styles.less',
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    '*.less'
                ],
                // tasks: ['less', 'postcss']
                tasks: ['less']
            }
        },
        browserSync: {
            html: {
                bsFiles: {
                    src : [
                      '*.less'
                    ]
                },
                options: {
                    watchTask: true,
                    debugInfo: true,
                    online: true,
                    server: {
                        baseDir: "."
                    },
                }
            },
            site: {
                bsFiles: {
                    src : [
                      '*.less'
                    ]
                },
                options: {
                    watchTask: true,
                    debugInfo: true,
                    proxy: "localhost:8888",
                    reloadDelay: 3000,
                    // reloadDebounce: 2000,
                    online: true
                }
            }
        }
    });


    // grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    // grunt.loadNpmTasks('grunt-postcss');

    // CWD to theme folder
    // grunt.file.setBase('./src/sfama/site/theme');

    // grunt.registerTask('compile', ['less', 'postcss']);
    grunt.registerTask('compile', ['less']);
    grunt.registerTask('default', ['compile']);
    grunt.registerTask('bsync', ["browserSync:html", "watch"]);
    grunt.registerTask('site-bsync', ["browserSync:site", "watch"]);
};
