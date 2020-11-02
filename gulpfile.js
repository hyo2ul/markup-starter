const { src, dest, watch, parallel, series } = require('gulp');
const fileInclude = require('gulp-file-include');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const prettier = require('gulp-prettier');
const imagemin = require('gulp-imagemin');
const del = require('del');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

function devHTML() {
  return src('src/pages/**/*.html')
    .pipe(
      fileInclude({
        basepath: 'src/components/',
        context: {
          URL: '',
        },
      })
    )
    .pipe(dest('dist'));
}

function devCSS() {
  const plugins = [autoprefixer()];
  return src('assets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(dest('dist/assets/css'));
}

function clean() {
  return del('build');
}

function prodHTML() {
  return src('src/pages/**/*.html')
    .pipe(
      fileInclude({
        basepath: 'src/components/',
        context: {
          URL: '',
        },
      })
    )
    .pipe(dest('build'));
}

function validate() {
  return src('build/**/*.html').pipe(prettier()).pipe(dest('build'));
}

function copy() {
  return src('assets/!(sass)**/**').pipe(dest('build/assets'));
}

function prodCSS() {
  const plugins = [autoprefixer()];
  return src('assets/sass/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(dest('build/assets/css'));
}

function optimizeImg() {
  return src('assets/img/*').pipe(imagemin()).pipe(dest('build/assets/img'));
}

function watches() {
  watch('src/**/*.html', { delay: 500 }, series(devHTML, browserReload));
  watch('assets/sass/**/*.scss', { delay: 500 }, series(devCSS, browserReload));
  watch('assets/js/*.js', { delay: 500 }, browserReload);
}

function browserReload(cb) {
  browserSync.reload();
  cb();
}

function server() {
  browserSync.init({
    server: {
      baseDir: '/',
      routes: {
        '/': 'dist',
        '/assets/fonts': 'assets/fonts',
        '/assets/js': 'assets/js',
        '/assets/img': 'assets/img',
        '/assets/vendors': 'assets/vendors',
      },
    },
  });
}

exports.default = series(devHTML, devCSS, parallel(watches, server));
exports.build = series(clean, prodHTML, prodCSS, validate, optimizeImg, copy);
