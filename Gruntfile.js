'use strict';

module.exports = function (grunt) {

// Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

// Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

// Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },

            all: {
                src: [
                    'Gruntfile.js',
                    'app/scripts/{,*/}*.js'
                ]
            }
        },

        copy: {
            dist: {
                cwd: 'app',
                src: ['**', '!style/**/*.css', '!script/**/*.js'],
                dest: 'dist',
                expand: true
            },

            fonts: {
                files: [
                    {
                        expand:true,
                        dot: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    },{
                        expand:true,
                        dot: true,
                        cwd: 'bower_components/font-awesome',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    }
                ]
            }
        },

        clean: {
            build: {
                src: ['dist/']
            }
        },

        useminPrepare: {
            html: 'app/menu.html',
            options: {
                dest: 'dist'
            }
        },

        concat: {
            options:{
                separator: ';'
            },

            dist: {}
        },

        uglify: {
            dist:{}
        },

        cssmin: {
          dist: {}
        },

        filerev: {
            options: {
                options: {
                    encoding: 'utf8',
                    algorithm: 'md5',
                    length: 20
                }
            },
            release: {
                files: [{
                    src: [
                        'dist/scripts/*.js',
                        'dist/style/*.css',
                    ]
                }]
            }
        },

        usemin: {
            html: ['dist/*.html'],
            css: ['dist/styles/*.css'],
            options:{
                assertDirs: ['dist', 'dist/styles']
            }
        },

        watch: {
            copy: {
                files: [ 'app/**', '!app/**/*.css', '!app/**/*.js'],
                tasks: [ 'build' ]
            },

            scripts: {
                files: ['app/scripts/app.js'],
                tasks:[ 'build']
            },

            styles: {
                files: ['app/styles/mystyles.css'],
                tasks:['build']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },

                files: [
                    'app/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },

            dist: {
                options: {
                    open: true,
                    base:{
                        path: 'dist',
                        options: {
                            index: 'menu.html',
                            maxAge: 300000
                        }
                    }
                }
            }
        },
    });

    grunt.registerTask('build', [
        'clean',
        'jshint',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'filerev',
        'usemin'
    ]);

    grunt.registerTask('serve', [
        'build',
        'connect:dist',
        'watch'
    ]);

    grunt.registerTask('default',['build']);
};