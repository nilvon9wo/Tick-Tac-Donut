var SRC = 'src';
var ES5 = 'es5';
var CLIENT = __dirname + '/public';

var UI_SCRIPTS = [
];

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var bunyan = require('bunyan');
var concatCss = require('gulp-concat-css');
var del = require('del');
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var runSeq = require('run-sequence');
var source = require('vinyl-source-stream');
var sourceMaps = require('gulp-sourcemaps');
var typeScript = require('gulp-typescript');
var typeScriptify = require('tsify');
var typeScriptLint = require('gulp-tslint');
var uglify = require('gulp-uglify');

var environments = require('gulp-environments');
var development = environments.development;
var staging = environments.make('staging');
var production = environments.production;

function build(callback) {
    console.log('Building...');
    return runSeq(
            'clean-fast',
            ['transpile', 'transcribe-html', 'concat-css'],
            'transcribe-ui-js',
            callback
            );
}

function transpile() {
    console.log('Transpiling...');
    var tsProject = typeScript.createProject('src/tsconfig.json');
    return tsProject
            .src()
            .pipe(typeScript(tsProject))
            .js.pipe(gulp.dest(ES5));
}

function tslint() {
    console.log('Linting...');
    return gulp.src('./src/**/*.ts')
            .pipe(typeScriptLint({
                configuration: 'tslint.json',
                formatter: 'verbose'
            }))
            .pipe(typeScriptLint.report({
                emitError: false,
                summarizeFailureOutput: true
            }));
}

// Cleaning tasks --------------------------------------

gulp.task('clean-all', function (callback) {
    return del([ES5, CLIENT], callback);
});

gulp.task('clean-fast', ['clean-api', 'clean-ui-fast']);

gulp.task('clean-api', function (callback) {
    return del([ES5], callback);
});

gulp.task('clean-ui-all', function (callback) {
    return del([CLIENT], callback);
});

gulp.task('clean-ui-fast', function (callback) {
    return del([
        CLIENT + '/**/*', CLIENT + '/**/*.*',
        '!' + CLIENT,
        '!' + CLIENT + '/bower_components',
        '!' + CLIENT + '/bower_components/**'
    ], callback);
});

// Transformation tasks --------------------------------------

gulp.task('default', ['build']);

gulp.task('build', build);

gulp.task('build-api', ['transpile']);

gulp.task('build-ui', ['build']);

gulp.task('transpile', transpile);

gulp.task('transcribe-html', function () {
    return gulp.src([SRC + '/**/*.html'])
            .pipe(gulp.dest(CLIENT));
});

gulp.task('concat-css', function () {
    return gulp.src([SRC + '/**/*.css'])
            .pipe(concatCss('index.css'))
            .pipe(gulp.dest(CLIENT));
});

gulp.task('transcribe-ui-js', function () {
    function pointTo(scripts) {
        return scripts.map(function (script) {
            return ES5 + '/' + script + '.js';
        });
    }

    return browserify({
        basedir: '.',
        debug: true,
        entries: pointTo(UI_SCRIPTS),
        cache: {},
        packageCache: {}
    })
            //.transform('babelify')
            .bundle()
            .pipe(source('index.js'))
            .pipe(buffer())
            .pipe(sourceMaps.init({loadMaps: true}))
            //.pipe(uglify())
            .pipe(sourceMaps.write('./'))
            .pipe(gulp.dest(CLIENT));
});

// Misc tasks --------------------------------------

gulp.task('start', function () {
    runSeq('tslint', 'build', function () {
        require('child_process').spawn;
        nodemon({
            ext: 'css html js json sh ts',
            legacyWatch: true,
            readable: true,
            script: ES5 + '/app.js',
            stdout: true
        })
                .on('restart', function () {
                    gulpUtil.log('---------- Restarted! ----------');
                    tslint();
                });
    });
});

gulp.task('tslint', tslint);
