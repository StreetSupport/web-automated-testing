'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import foreach from 'gulp-foreach'
import casperJs from 'gulp-casperjs'
import download from 'gulp-download'
import runSequence from 'run-sequence'
import * as config from './config'

gulp.task('warm-api', () => {
  download(config.apiUri)
})

gulp.task('build', () => {
  return gulp.src('tests/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('_dist/'))
})

gulp.task('casper', () => {
  return gulp.src('_dist/**/*.js')
    .pipe(foreach((stream, file) => {
      console.log('test:' + file.relative)
      return stream
        .pipe(casperJs())
    }))
})

gulp.task('watch', () => {
  gulp.watch(config.testDir, ['build', 'casper'])
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
