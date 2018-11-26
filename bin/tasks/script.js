const gulp      = require('gulp'),
      eslint    = require('gulp-eslint'),
      plumber   = require('gulp-plumber'),
      babel     = require('gulp-babel'),
      rev       = require('gulp-rev'),
      changed   = require('gulp-changed'),
      ugLify    = require('gulp-uglify'),
      sourceMap = require('gulp-sourcemaps'),
      browserify= require('gulp-browserify'),
      urlReplace= require('gulp-url-replace'),
      project   = require('../../project.config')

const OUT_DIR  = project.outDir
const SRC_DIR  = project.srcDir
const REV_DIR  = project.revDir
const TEMP_DIR = project.tempDir
const PORT     = project.port
const ALIAS    = project.alias
const local    = 'http://localhost:' + PORT

let optionsURL   = {}
optionsURL[ALIAS] = local

const optionsBabel = {
    presets: [
        [
            "@babel/preset-env",
            {
                modules: "commonjs",
                targets: {
                    browsers: ["> 1%", "last 5 versions", "Android >= 4"]
                }
            }
        ]
    ],
    plugins: [
        ["@babel/plugin-transform-runtime"],
        ["@babel/plugin-proposal-object-rest-spread", {"useBuiltIns": true}]
    ]
}

gulp.task("script", function () {
    return gulp.src([SRC_DIR + '/js/*.js'])
        .pipe(changed(TEMP_DIR + '/js'))
        .pipe(plumber())
        .pipe(eslint('../.eslintrc.js'))
        .pipe(eslint.format())
        .pipe(sourceMap.init())
        .pipe(babel(optionsBabel))
        .pipe(browserify())
        .pipe(urlReplace(optionsURL))
        .pipe(sourceMap.write())
        .pipe(gulp.dest(TEMP_DIR + '/js'))

})

gulp.task("script-lib", function () {
    return gulp.src([SRC_DIR + '/js/lib/*.js'])
        .pipe(changed(TEMP_DIR + '/js/lib'))
        .pipe(plumber())
        .pipe(urlReplace(optionsURL))
        .pipe(gulp.dest(TEMP_DIR + '/js/lib'))

})

gulp.task("min-script", function () {
    return gulp.src([SRC_DIR + '/js/*.js'])
        .pipe(eslint('../.eslintrc.js'))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(babel(optionsBabel))
        .pipe(browserify())
        .pipe(ugLify())
        .pipe(rev())
        .pipe(gulp.dest(OUT_DIR + '/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(REV_DIR + '/js'))

})

gulp.task("min-lib", function () {
    return gulp.src([SRC_DIR + '/js/lib/*.js'])
        .pipe(ugLify())
        .pipe(rev())
        .pipe(gulp.dest(OUT_DIR + '/js/lib'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(REV_DIR + '/js/lib'))

})
