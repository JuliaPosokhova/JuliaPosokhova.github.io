// Load plugins
var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache');

// Styles
gulp.task('styles', function () {
    return gulp.src('assets/styles/main.less')
        .pipe(less({
            style: 'expanded'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({message: 'Styles task complete'}));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src('assets/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({message: 'Scripts task complete'}));
});

// Images
gulp.task('images', function () {
    return gulp.src('assets/images/**/*')
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({message: 'Images task complete'}));
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
        .pipe(clean());
});

// Default task
gulp.task('default', ['styles', 'scripts', 'images']);
