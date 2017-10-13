var basePaths = {
  node: 'node_modules/',
  src:  'src/',
  sass: 'process/sass/',
  scripts: 'process/scripts/',
  dest: 'build/'
};

var gulp 			    = require('gulp');
var postcss 		  = require('gulp-postcss');
var sass 			    = require('gulp-sass');
var cssnano 		  = require('cssnano');
var autoprefixer 	= require('autoprefixer');
var animation 		= require('postcss-animation');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');

// Process CSS - compile SASS/minify
gulp.task('css', function() {
  return gulp.src(basePaths.sass + 'style.scss')
  .pipe(sass())
  .pipe(postcss([
    animation(),
    autoprefixer('last 2 versions', '> 1%'),
    cssnano()
  ]))
  .pipe(gulp.dest(basePaths.dest + 'css'));
});

// Process JS - compile to one file/uglify
gulp.task('js', function() {
  var scripts = [
    basePaths.src + 'jquery/jquery.min.js',
    basePaths.scripts + 'navigation.js',
    basePaths.scripts + 'parallax.js'
  ];

  gulp.src(scripts)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(basePaths.dest + 'js/'));
});

// Get assets from node_modules
gulp.task('assets', function() {
  var stream = gulp.src(basePaths.node + 'bootstrap-sass-grid/sass/**/*.scss')
    .pipe(gulp.dest(basePaths.src + 'bootstrap'));

  gulp.src(basePaths.node + 'jquery/dist/jquery.min.js')
    .pipe(gulp.dest(basePaths.src + 'jquery'));

  gulp.src(basePaths.node + 'font-awesome/fonts/**/*.{ttf,woff,woff2,eof,svg}')
    .pipe(gulp.dest(basePaths.dest + 'fonts/'));

  gulp.src(basePaths.node + 'font-awesome/scss/*.scss')
    .pipe(gulp.dest(basePaths.src + 'font-awesome/'));

  return stream;
});

// Watch for changes
gulp.task('watch', function() {
  gulp.watch(basePaths.sass + '**/*.scss', ['css']);
  gulp.watch(basePaths.scripts + '**/*.js', ['js']);
});

// Gulp
gulp.task('default', ['css', 'watch']);
