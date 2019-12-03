const gulp       = require('gulp'),
      path       = require('path'),
      changed    = require('gulp-changed'),
      htmlMin    = require('gulp-htmlmin'),
      handlebars = require('gulp-compile-handlebars'),
      urlReplace = require('gulp-url-replace'),
      project    = require('../../project.config')

const OUT_DIR  = project.outDir
const SRC_DIR  = project.srcDir
const TEMP_DIR = project.tempDir
const ALIAS    = project.alias
const PORT     = project.port
const local    = 'http://localhost:' + PORT

let optionsURL   = {}
optionsURL[ALIAS]= local

const options = {
    minifyJS                     : true,
    minifyCSS                    : true,
    removeComments               : true,
    collapseWhitespace           : true,
    removeEmptyAttributes        : true,
    removeScriptTypeAttributes   : true,
    removeStyleLinkTypeAttributes: true

}

const config = require(path.join(SRC_DIR, 'config'))

gulp.task('html', function() {
    return gulp.src(SRC_DIR + '/*.html')
        .pipe(changed(TEMP_DIR))
        .pipe(handlebars({
            config: config
        }))
        .pipe(urlReplace(optionsURL))
        .pipe(gulp.dest(TEMP_DIR))

})

gulp.task('min-html', function() {
    return gulp.src(SRC_DIR + '/*.html')
        .pipe(handlebars({
            config: config
        }))
        .pipe(htmlMin(options))
        .pipe(gulp.dest(OUT_DIR))
})
