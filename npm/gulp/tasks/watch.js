/**
 * Watch for file changes and run tasks.
 *
 * Tasks:
 * - Puts to destination
 * - Success/error message
 */

'use strict';

module.exports = function(gulp, $, config, messages) {
  gulp.task('watch', function() {
  	// Watch for .scss files
  	gulp.watch(config.sass.src, gulp.series('styles'));
    // Watch for min css
    gulp.watch(config.css.src, gulp.series('minify-css'));
    // Concat
    gulp.watch(config.scripts.src, gulp.series('scripts'));
    // Watch for min js
    gulp.watch(config.js.src, gulp.series('minify-js'));
  });
};
