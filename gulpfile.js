//define functions for the gulp

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber');

gulp.task('styles', function () {
  return gulp.src('./sass/styles.scss') //pathway to the SASS file
        .pipe(plumber()) // fixing mistakes like missing ';' or '}'
        .pipe(sourcemaps.init()) // in the above pathway will be sourcemaps
        .pipe(sass.sync())  // commend, allow to compile file SASS to CSS
        .pipe(autoprefixer({ //auto prefix filler for older browsers
            browsers: ['last 5 version']
        }))
        .pipe(sourcemaps.write('./')) // in the browser console it should show that the css was writen in sass
        .pipe(gulp.dest('./css')) // pathway, to where the compiled CSS should go to
});

//watch for SCSS files and if something change complie.
gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', gulp.series('styles'));
});
