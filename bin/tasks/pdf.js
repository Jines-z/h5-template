const gulp     = require('gulp'),
      changed  = require('gulp-changed'),
      project  = require('../../project.config')

const OUT_DIR  = project.outDir
const SRC_DIR  = project.srcDir
const TEMP_DIR = project.tempDir

gulp.task('pdf', function() {
    return gulp.src(SRC_DIR + '/pdf/**/*')
        .pipe(changed(TEMP_DIR))
        .pipe(gulp.dest(TEMP_DIR + '/pdf'))

})

gulp.task('min-pdf', function() {
    return gulp.src(SRC_DIR + '/pdf/**/*')
        .pipe(gulp.dest(OUT_DIR + '/pdf'))

})
