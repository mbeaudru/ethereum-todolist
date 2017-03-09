const gulp = require('gulp');
const watch = require('gulp-watch');
const shell = require('gulp-shell');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');

gulp.task('watch-contracts', () => {
  runSequence(['migrate-contracts']);
  return watch('contracts/*.sol', function () {
    runSequence(['clean-build', 'migrate-contracts']);
  });
});

gulp.task('clean-build', () => {
  return gulp
    .src('build/**')
    .pipe(clean({force: true}));
});

gulp.task('migrate-contracts', () => {
  gulp
    .src('contracts/*.sol')
    .pipe(shell([
      'truffle compile'
    ]))
    .pipe(shell([
      'truffle migrate'
    ]));
});
