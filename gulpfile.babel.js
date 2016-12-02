'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import casperJs from 'gulp-casperjs'
import download from 'gulp-download'
import runSequence from 'run-sequence'
import * as config from './config'
import del from 'del'


gulp.task('warm-api', () => {
  return download(config.apiUri)
})

gulp.task('clean', () => {
  return del([config.outputDir])
})

gulp.task('build', ['clean'], () => {
  return gulp.src(config.testDir + '/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(config.outputDir))
})

gulp.task('casper', ['warm-api', 'build'], () => {
  return gulp
    .src(config.outputDir + '/**/*Test.js')
    .pipe(casperJs({
      binPath: './node_modules/casperjs/bin/casperjs'
    }))
})

gulp.task('watch', () => {
  gulp.watch(config.testDir, ['build', 'casper'])
})

gulp.task('dev', (callback) => {
  runSequence(
    'casper',
    'watch',
    callback
  )
})

gulp.task('default', (callback) => {
  runSequence(
    'casper',
    callback
  )
})
