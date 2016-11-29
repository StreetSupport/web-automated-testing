'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import foreach from 'gulp-foreach'
import casperJs from 'gulp-casperjs'
import download from 'gulp-download'
import runSequence from 'run-sequence'
import * as config from './config'
import del from 'del'
import mkdirp from 'mkdirp'


var fs = require('fs');
gulp.task('warm-api', () => {
  download(config.apiUri)
})

gulp.task('build', () => {
  mkdirp(config.outputDir)

  fs.readdir(config.testDir, function(err, items) {
      console.log(items);

      for (var i=0; i<items.length; i++) {
          console.log(items[i]);
      }
  });

  gulp.src(config.testDir + '.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(config.outputDir))
})

gulp.task('casper', () => {
  // const builtTests = config.outputDir + '*Test.js'

  // console.log('Running tests matching: ' + builtTests)

  try {
    const path = __dirname + '/_dist/homeTest.js'
    const stats = fs.lstatSync(path)
    console.log(path + ' is file ' + stats.isFile())
  }
  catch (e) {
    console.log('error')
    console.log(e)
  }

  fs.readdir(config.outputDir, function(err, items) {
      console.log(items);

      for (var i=0; i<items.length; i++) {
          console.log(items[i]);
      }
  });


  gulp.src(__dirname + '_dist/homeTest.js')
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
