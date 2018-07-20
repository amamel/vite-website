//gulp-responsive (installed - need to configure)

'use strict';

// Project related
var project = 'vite.wp', // Project name, used for build zip.
    projectURL = 'vite.wp', // Local Development URL for BrowserSync. Change as-needed.
    build = './ship', // Files that you want to package into a zip go here
    buildInclude = [
        //include common files
        '**/*.php',
        '**/*.html',
        '**/*.css',
        '**/*.svg',


        // include specific files and folders
        'screenshot.png',

        // exclude files and folders
        '!node_modules/**/*',
        '!style.css.map'
    ];

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    gulpLoadTasks = require('gulp-load-tasks'),
    plugins = gulpLoadPlugins(),
    browserSync = require('browser-sync').create(),
    path = require('path'),
    reload = browserSync.reload;

// Put JS files into array
var jsFileList = [
    'assets/js/vendor/*.js',
    'assets/js/main.js'
];

gulpLoadPlugins({
    DEBUG: false, // when set to true, the plugin will log info to console. Useful for bug reporting and issue debugging
    pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
    scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within
    replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
    camelize: true, // if true, transforms hyphenated plugins names to camel case
    lazy: true // whether the plugins should be lazy loaded on demand
});

gulp.task('up', function() {
    browserSync.init({
        proxy: projectURL,
        open: true,
        injectChanges: true
    });

    gulp.watch('assets/scss/**/*.scss', ['sass']);
    gulp.watch('assets/js/**/*.js', ['js']);
    gulp.watch('assets/js/vendor-head/**/*.js', ['js-head']);
    gulp.watch('assets/img/svg/**/*.svg', ['svgs']);
    gulp.watch('assets/scss/**/*.scss').on('change', browserSync.reload);
    gulp.watch('wp-content/**/*.php').on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src('assets/scss/main.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            onError: browserSync.notify
        }))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css'))
        .pipe(plugins.cssnano())
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.notify({ message: 'TASK: styles Success! 💯', onLast: true }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function() {
    return gulp.src(jsFileList)
        .pipe(plugins.plumber())
        .pipe(plugins.concat('scripts.js'))
        .pipe(gulp.dest('assets/js/build'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.notify({ message: 'TASK: JS Success! 💯', onLast: true }))
        .pipe(gulp.dest('assets/js/build'));
});

gulp.task('js-head', function() {
    return gulp.src('assets/js/vendor-head/*.js')
        .pipe(plugins.plumber())
        .pipe(plugins.concat('scripts-head.js'))
        .pipe(gulp.dest('assets/js/build'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.notify({ message: 'TASK: headJs Success! 💯', onLast: true }))
        .pipe(gulp.dest('assets/js/build'));
});

gulp.task('modernizr', function() {
    return gulp.src('assets/js/build/*.js')
        .pipe(plugins.modernizr())
        .pipe(gulp.dest('assets/js/vendor-head'));
});


gulp.task('svgs', function() {
    return gulp.src('assets/img/svg/*.svg')
        .pipe(plugins.plumber())
        .pipe(plugins.rename({ prefix: 'shape-' }))
        .pipe(plugins.svgmin(function(file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(plugins.svgstore())
        .pipe(plugins.rename('svg-defs.svg'))
        .pipe(plugins.notify({ message: 'TASK: "SVG" Success! 💯', onLast: true }))
        .pipe(gulp.dest('views/utility'));
});

gulp.task('clear', function() {
    plugins.cache.clearAll();
});


gulp.task('watch', function() {
    gulp.watch('assets/scss/**/*.scss', ['sass']);
    gulp.watch('assets/js/**/*.js', ['js']);
    gulp.watch('assets/img/svg/**/*.svg', ['svgs']);
    gulp.watch('**/*.php').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'js', 'js-head', 'svgs', 'watch']);