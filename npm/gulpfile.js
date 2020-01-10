// Modules
const {src, dest, watch, series} = require('gulp');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const concat        = require('gulp-concat');
const postcss       = require('gulp-postcss');
const replace       = require('gulp-replace');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const uglify        = require('gulp-uglify');
const notify        = require('gulp-notify');
const cleanCSS      = require('gulp-clean-css');
const rename        = require('gulp-rename');
const fs            = require('fs');

// File paths
const files = {
  scssPath: '../scss/**/*.scss',
  cssPath: '../css/',
  cssFile: '../css/style.css'
};

// Compile SCSS
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(files.cssPath))
    .pipe(notify('Compile: success!')
    );
}

// Minify
function minifyTask() {
  if (fs.existsSync(files.cssFile)) {
    return src(files.cssFile)
      .pipe(cleanCSS())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(dest(files.cssPath));
  }
}

// Watch
function watchTask() {
  watch([files.scssPath], series(scssTask, minifyTask));
}

// Default
exports.default = series(
  series(scssTask, minifyTask),
  watchTask
);
