const gulp        = require('gulp'),
      browserSync = require('browser-sync').create(),
      httpProxy   = require('http-proxy-middleware'),
      address     = require('address'),
      project     = require('../../project.config')

const TEMP_DIR   = project.tempDir
const PORT       = project.port
const HOST       = project.host
const ALIAS_URL  = project.aliasURL
const PUBLIC_URL = project.publicURL

gulp.task('js-watch', ['script'], function(done) {
    browserSync.reload()
    done()
})
gulp.task('lib-watch', ['script-lib'], function(done) {
    browserSync.reload()
    done()
})
gulp.task('scss-watch', ['scss'], function(done) {
    browserSync.reload()
    done()
})
gulp.task('html-watch', ['html'], function(done) {
    browserSync.reload()
    done()
})
gulp.task('mock-watch', ['mock'], function(done) {
    browserSync.reload()
    done()
})
gulp.task('images-watch', ['images'], function(done) {
    browserSync.reload()
    done()
})
gulp.task('fonts-watch', ['fonts'], function(done) {
    browserSync.reload()
    done()
})
gulp.task('pdf-watch', ['pdf'], function(done) {
    browserSync.reload()
    done()
})

const middleware = () => {
    let proxyOptions = {
        target: PUBLIC_URL + '/',
        changeOrigin: true,
        pathRewrite: {
            ['^/' + ALIAS_URL]: ''
        }
    }
    let proxy = httpProxy('/' + ALIAS_URL, proxyOptions)
    return proxy
}

gulp.task('serve-html', ['script-lib', 'script', 'scss', 'html', 'fonts', 'images', 'pdf', 'mock'], function () {
    let host = ''
    if (HOST === '0.0.0.0') {
        try {
            host = address.ip()
        } catch (e) {
            host = 'localhost'
        }
    } else {
        host = HOST || 'localhost'
    }
    browserSync.init({
        host,
        port: PORT,
        server: {
            baseDir: [TEMP_DIR],
            middleware: middleware()
        }
    })
    gulp.watch('../src/js/*.js',     ['js-watch'])
    gulp.watch('../src/js/lib/*.js', ['lib-watch'])
    gulp.watch('../src/scss/**/*',   ['scss-watch'])
    gulp.watch('../src/*.html',      ['html-watch'])
    gulp.watch('../src/images/**/*', ['images-watch'])
    gulp.watch('../src/fonts/*',     ['fonts-watch'])
    gulp.watch('../src/pdf/*',       ['pdf-watch'])
    gulp.watch('../src/mock/*.json', ['mock-watch'])
})

gulp.task('s-html', ['delete-temp'], function() {
    gulp.start('serve-html')
})
