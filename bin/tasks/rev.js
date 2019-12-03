const gulp         = require('gulp'),
      urlReplace   = require('gulp-url-replace'),
      revCollector = require('gulp-rev-collector'),
      project      = require('../../project.config')

const REV_DIR  = project.revDir
const OUT_DIR  = project.outDir
const ALIAS    = project.alias
const PATH     = project.publicPath
const ALIAS_URL= project.aliasURL

let optionsURL  = {}
optionsURL[ALIAS] = PATH
optionsURL['/' + ALIAS_URL] = ''

gulp.task('rev-html', function() {
    return gulp.src([REV_DIR + '/**/*.json', OUT_DIR + '/*.html'])
        .pipe(revCollector({ replaceReved: true }))
        .pipe(urlReplace(optionsURL))
        .pipe(gulp.dest(OUT_DIR))
})

gulp.task('rev-css', function() {
    return gulp.src([REV_DIR + '/**/*.json', OUT_DIR + '/css/**/*.css'])
        .pipe(revCollector({ replaceReved: true }))
        .pipe(urlReplace(optionsURL))
        .pipe(gulp.dest(OUT_DIR + '/css'))
})

gulp.task('rev-js', function() {
    return gulp.src([REV_DIR + '/**/*.json', OUT_DIR + '/js/**/*.js'])
        .pipe(revCollector({ replaceReved: true }))
        .pipe(urlReplace(optionsURL))
        .pipe(gulp.dest(OUT_DIR + '/js'))
})
