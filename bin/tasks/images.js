const gulp     = require('gulp'),
      rev      = require('gulp-rev'),
      changed  = require('gulp-changed'),
      imageMin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant'),
      project  = require('../../project.config')

const OUT_DIR  = project.outDir
const SRC_DIR  = project.srcDir
const REV_DIR  = project.revDir
const TEMP_DIR = project.tempDir

gulp.task('images', function() {
    return gulp.src(SRC_DIR + '/images/**/*')
        .pipe(changed(TEMP_DIR + '/images'))
        .pipe(gulp.dest(TEMP_DIR + '/images'))

})

gulp.task('min-images', function() {
    return gulp.src(SRC_DIR + '/images/**/*')
        .pipe(imageMin({
            optimizationLevel: 7,
            progressive: true,
            multipass: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(rev())
        .pipe(gulp.dest(OUT_DIR + '/images'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(REV_DIR + '/images'))

})
