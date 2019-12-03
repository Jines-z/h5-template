const gulp      = require('gulp'),
      plumber   = require('gulp-plumber'),
      changed   = require('gulp-changed'),
      project   = require('../../project.config')

const SRC_DIR  = project.srcDir
const TEMP_DIR = project.tempDir

gulp.task('mock', function() {
    return gulp.src([SRC_DIR + '/mock/*.json'])
        .pipe(changed(TEMP_DIR + '/mock'))
        .pipe(plumber())
        .pipe(gulp.dest(TEMP_DIR + '/mock'))

})
