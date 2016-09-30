var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var path = require('path');

var paths = {
	styles: './client/views/**/*'
};

gulp.task('sass', function () {
	return gulp.src('./client/views/discount-request/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./client/views/discount-request'));
});

gulp.task('watch', function () {
	gulp.watch(paths.styles, ['sass']);
});

gulp.task('default', ['sass', 'watch']);