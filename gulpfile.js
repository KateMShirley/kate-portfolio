const gulp = require('gulp');
const sass = require('gulp-sass');
const cssFiles = '_scss/**/*.?(s)css';
const child = require('child_process');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();
const siteRoot = '_site';

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('css', () => {
  gulp.src(cssFiles)
    .pipe(sass())
    .pipe(gulp.dest('styles'));
});

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });
  gulp.watch(cssFiles, ['css']);
});

gulp.task('default', ['css', 'jekyll', 'serve'])
