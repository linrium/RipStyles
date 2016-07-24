var gulp = require('gulp');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');
// use with sass and less, don't use with styl
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var minifyname = require('gulp-minify-cssnames');
var uncss = require('gulp-uncss');
var shorthand = require('gulp-shorthand');
var rename = require("gulp-rename");
var stylus = require('gulp-stylus');
var nib = require('nib');
var nodemon = require('gulp-nodemon');

var dir = {
    stylus: './_stylus/',
    jade: './_jade/'
};

var build = {
    stylus: './_build/css/',
    jade: './_build/',
    js: './_build/js/'
};

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './_build'
        }
    });
});

gulp.task('stylus', function() {
    gulp.src(dir.stylus + 'main.styl')
        .pipe(stylus({
            use: nib(),
            'include css': true
        }))
        .pipe(gulp.dest(build.stylus));
});

gulp.task('jade', function() {
    gulp.src(dir.jade + 'index.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(build.jade));
});

gulp.task('watch', ['browserSync'], function() {
    gulp.watch(dir.jade + '**/*.jade', ['jade'], browserSync.reload);
    gulp.watch(build.jade + 'index.html', browserSync.reload);
    gulp.watch(dir.stylus + '**/*.styl', ['stylus'], browserSync.reload);
    gulp.watch(build.stylus + 'main.css', browserSync.reload);
    gulp.watch(build.js + 'functions.js', browserSync.reload);
});

gulp.task('demon', function() {
    nodemon({
            script: 'gulpfile.js',
            ext: 'html css styl jade',
            env: {
                'NODE_ENV': 'development'
            }
        })
        .on('start', ['watch'])
        .on('change', ['watch'])
        .on('restart', function() {
            console.log('restarted!');
        });
});

gulp.task('default', ['demon']);

gulp.task('optimize-css', function() {
    gulp.src(build.stylus + 'main.css')
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(shorthand())
        .pipe(minifyname())
        .pipe(uncss({
            html: [build.jade + 'index.html']
        }))
        .pipe(cleancss())
        .pipe(gulp.dest(build.stylus));
});

gulp.task('optimize', ['optimize-css']);
