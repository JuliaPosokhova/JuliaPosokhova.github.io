var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
//plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin');
    //prefix = require('gulp-autoprefixer');
    //debugLog = require('debug-log')('foo');


function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

// Scripts tasks
// Uglifies
gulp.task('scripts', function () {
    gulp.src('assets/js/*.js')
        .on('error', errorLog)
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// Styles tasks
// Uglifies
gulp.task('styles', function () {
    return sass('assets/**/*.scss', {
        style: 'expanded'
    })
        .pipe(gulp.dest('dist'))
        .on('error', errorLog)
        //.pipe(prefix('last 2 version'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

//fonts task
gulp.task('fonts', function () {
    gulp.src('assets/fonts/*')
        .on('error', errorLog)
        .pipe(gulp.dest('dist/fonts'));
});

// Image tasks
// Compressed
gulp.task('image', function () {
    gulp.src('assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// Watch tasks
// Watches js
gulp.task('watch', function () {
    var server = livereload();
    gulp.watch('assets/js/*.js', ['scripts']);
    gulp.watch('assets/**/*.scss', ['styles']);
});
gulp.task('default', ['scripts', 'watch', 'styles', 'image', 'fonts']);
