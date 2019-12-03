const gulp     = require('gulp'),
      del      = require('del'),
      project  = require('../../project.config')

const OUT_DIR  = project.outDir
const REV_DIR  = project.revDir
const TEMP_DIR = project.tempDir

gulp.task('delete-temp', function(cb) {
    return del(
        [TEMP_DIR + '/*'],
        {force:true},
        cb
    )
})

gulp.task('delete-dist', function(cb) {
    return del(
        [OUT_DIR + '/*'],
        {force:true},
        cb
    )
})

gulp.task('delete-rev', function(cb) {
    return del(
        [REV_DIR],
        {force:true},
        cb
    )
})
