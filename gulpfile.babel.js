'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import casperJs from 'gulp-casperjs'
import download from 'gulp-download'
import runSequence from 'run-sequence'

const outputDir = '_dist/tests'
const testDir = 'tests/**/*'

gulp.task('warm-api', () => {
  download('https://dev-api-streetsupport.azurewebsites.net/v2/service-categories')
})

gulp.task('build', () => {
  gulp.src(testDir + '.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(outputDir))
})

gulp.task('casper', () => {
  gulp.src(outputDir + '/**/*Test.js')
    .pipe(casperJs())
})

gulp.task('watch', () => {
  gulp.watch(testDir, ['build', 'casper'])
})

gulp.task('dev', (callback) => {
  runSequence(
    'warm-api',
    'build',
    'casper',
    'watch',
    callback
  )
})


gulp.task('default', (callback) => {
  runSequence(
    'warm-api',
    'build',
    'casper',
    callback
  )
})
