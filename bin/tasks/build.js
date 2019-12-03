const gulp        = require('gulp'),
      runSequence = require('run-sequence')

gulp.task('b-html', ['delete-dist'], function() {
    runSequence(
        'min-fonts',
        'min-images',
        'min-lib',
        ['min-scss', 'min-script', 'min-pdf', 'min-html'],
        ['rev-html', 'rev-css', 'rev-js'],
        'delete-rev'
    )
})
