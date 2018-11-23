const gulp         = require('gulp'),
      rev          = require('gulp-rev'),
      path         = require('path'),
      replace      = require('gulp-rev-replace'),
      urlReplace   = require('gulp-url-replace'),
      sass         = require('gulp-sass'),
      changed      = require('gulp-changed'),
      postCss      = require('gulp-postcss'),
      cleanCSS     = require('gulp-clean-css'),
      autoPreFixer = require('autoprefixer'),
      project      = require('../../project.config')

const BASE_DIR = project.baseDir
const OUT_DIR  = project.outDir
const SRC_DIR  = project.srcDir
const REV_DIR  = project.revDir
const TEMP_DIR = project.tempDir
const PORT     = project.port
const ALIAS    = project.alias

let local = 'http://localhost:' + PORT
let optionsURL = {}
optionsURL[ALIAS] = local

gulp.task('scss', function () {
    return gulp.src([SRC_DIR + '/scss/*.scss'])
        .pipe(changed(TEMP_DIR + '/css'))
        .pipe(sass({
            includePaths: [path.join(BASE_DIR, 'node_modules')]
        }).on('error', sass.logError))
        .pipe(urlReplace(optionsURL))
        .pipe(gulp.dest(TEMP_DIR + '/css'))

})

gulp.task('min-scss', function () {
    const manifest = gulp.src(OUT_DIR + '/rev/fonts/rev-manifest.json')
    return gulp.src([SRC_DIR + '/scss/*.scss'])
        .pipe(sass({
            includePaths: [path.join(BASE_DIR, 'node_modules')]
        }).on('error', sass.logError))
        .pipe(postCss([autoPreFixer({
            browsers: ['> 1%', 'last 5 version', 'Android >= 4.0', 'last 3 iOS versions'],
            cascade: false,
            remove: true
        })]))
        .pipe(cleanCSS())
        .pipe(replace({manifest: manifest}))
        .pipe(rev())
        .pipe(gulp.dest(OUT_DIR + '/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(REV_DIR + '/css'))

})
