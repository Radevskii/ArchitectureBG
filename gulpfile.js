var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
const minify = require('gulp-minify-css');
const postcss = require('gulp-postcss')
var sasslint = require('gulp-sass-lint');

gulp.task("style", () => {
    return gulp.src('script/src/*.scss')
          .pipe(sass())
          .pipe(postcss([ autoprefixer() ]))
          .on("error", sass.logError)
          .pipe(gulp.dest('dist/css'));
});
//exports.style = style;

gulp.task("mini", () => {
	  return gulp.src('dist/css/*.css')
	    	.pipe(minify())
	    	.pipe(gulp.dest('dist/css/minifiles'));
});
//exports.mini = mini;

gulp.task("lint", () => {
	return gulp.src('script/src/*.scss')
			.pipe(sasslint())
			.pipe(sasslint.format())
			.pipe(sasslint.failOnError());
});
//exports.lint = lint;

gulp.task("test", () => {
    return gulp.watch('script/src/*.scss', gulp.series(['style', 'mini', 'lint']));
});
