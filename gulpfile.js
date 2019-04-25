const { watch, src, dest, series } = require('gulp')
const htmlminplugin = require('gulp-htmlmin')
const browserSync = require('browser-sync').create()

function copy () {
  return src('src/**').pipe(dest('dist'))
}

function dev () {
  watch('./src/**').on('change', browserSync.reload)

  return browserSync.init({
    server: {
      baseDir: './src'
    }
  })
}

function htmlmin () {
  return src('src/*.html')
    .pipe(htmlminplugin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
}

let build = series(copy, htmlmin)

exports.build = build
exports.default = dev
