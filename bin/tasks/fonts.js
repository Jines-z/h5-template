const gulp     = require('gulp'),
      changed  = require('gulp-changed'),
      rev      = require('gulp-rev'),
      project  = require('../../project.config')

const OUT_DIR  = project.outDir
const SRC_DIR  = project.srcDir
const TEMP_DIR = project.tempDir
const REV_DIR  = project.revDir

gulp.task('fonts', function () {
    return gulp.src(SRC_DIR + '/fonts/*')
        .pipe(changed(TEMP_DIR))
        .pipe(gulp.dest(TEMP_DIR + '/fonts'))

})

gulp.task('min-fonts', function () {
    return gulp.src([SRC_DIR + '/fonts/*', '!' + SRC_DIR + '/fonts/*.css'])
        .pipe(rev())
        .pipe(gulp.dest(OUT_DIR + '/fonts'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(REV_DIR + '/fonts'))

})
