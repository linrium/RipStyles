var gulp = require('gulp'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('jade', function() {
    gulp.src('./index.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('stylus', function() {
    gulp.src('./stylus/main.styl')
        .pipe(stylus({
            use: nib(),
            'include css': true
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./**/*.jade', ['jade']);
    gulp.watch('./**/*.styl', ['stylus']);
});

gulp.task('default', ['connect', 'jade', 'stylus', 'watch']);
