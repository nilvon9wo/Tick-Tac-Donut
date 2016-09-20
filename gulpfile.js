var SRC = 'src';
var CLIENT_SRC = SRC + '/client';
var ES5 = 'es5';
var TESTS = 'tests';
var PUBLIC = 'public';

var UI_SCRIPTS = [
        'common/DifficultyLevel',
        'common/ModelInterface',
        'common/PlayerType',
        'common/UIControllerInterface',
        'logger/DefaultLogger',
        'logger/LoggerInterface',
        'ticTacToe/game/TicTacToeBadLocationError',
        'ticTacToe/game/TicTacToeBoard',
        'ticTacToe/game/TicTacToeGame',
        'ticTacToe/game/TicTacToeGameStatus',
        'ticTacToe/game/TicTacToeGameView',
        'ticTacToe/game/TicTacToeGameViewState',
        'ticTacToe/markers/TicTacToeMarker',
        'ticTacToe/players/TicTacToeBadPlayerError',
        'ticTacToe/players/TicTacToeComputerPlayerAction',
        'ticTacToe/players/TicTacToeComputerPlayerActionCalculator',
        'ticTacToe/players/TicTacToeComputerPlayerActionComparitor',
        'ticTacToe/players/TicTacToeComputerPlayerInterface',
        'ticTacToe/players/TicTacToeComputerPlayerSelector',
        'ticTacToe/players/TicTacToeEasyComputerPlayer',
        'ticTacToe/players/TicTacToeImpossibleComputerPlayer',
        'ticTacToe/players/TicTacToeModerateComputerPlayer',
        'ticTacToe/players/TicTacToeHumanPlayer',
        'ticTacToe/players/TicTacToePlayerInterface',
        'ticTacToe/TicTacToeState',
        'ticTacToe/TicTacToeStateStatus',
        'ticTacToe/TicTacToeUIController',
        'ticTacToe/TicTacToeUIControllerInterface',
        'index'
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
var spawn = require('child_process').spawn;
var typeScript = require('gulp-typescript');
var typeScriptify = require('tsify');
var typeScriptLint = require('gulp-tslint');
var uglify = require('gulp-uglify');

var environments = require('gulp-environments');
var development = environments.development;
var staging = environments.make('staging');
var production = environments.production;

var node;

function build(callback) {
    console.log('Building...');
    return runSeq('clean-fast', [
            'transpile-ts',
            'transpile-ts-tests',
            'transcribe-html',
            'transcribe-images',
            'transcribe-css'
    ], 'transcribe-ui-js', callback);
}

function stop() {
    console.log('Stopping...');
    if (node) {
        try {
            node &&
            node.kill &&
            (typeof node.kill === 'function') &&
            node.kill();
        }
        catch (error) {
            console.error('Failed to stop node: ' + error);
        }

    }
}

function transpile(srcConfig) {
    console.log('Transpiling...');
    var tsProject = typeScript.createProject(srcConfig);
    return tsProject.src().pipe(typeScript(tsProject)).js.pipe(gulp.dest(ES5));
}

function transcribeCss() {
    console.log('Transcribing CSS...');
    return gulp.src([
        CLIENT_SRC + '/**/*.css'
    ]).pipe(concatCss('index.css')).pipe(gulp.dest(PUBLIC));
}

function transcribeHtml() {
    console.log('Transcribing HTML...');
    return gulp.src([
        CLIENT_SRC + '/**/*.html'
    ]).pipe(gulp.dest(PUBLIC));
}

function transcribeImages() {
    console.log('Transcribing Images...');
    return gulp.src([
        CLIENT_SRC + '/**/*.png'
    ]).pipe(gulp.dest(PUBLIC));
}

function transcribeUiJs() {
    console.log('Transcribing UI JavaScript...');
    function pointTo(scripts) {
        return scripts.map(function(script) {
            return ES5 + '/client/' + script + '.js';
        });
    }

    return browserify({
        basedir : '.',
        debug : true,
        entries : pointTo(UI_SCRIPTS),
        cache : {},
        packageCache : {}
    })
    // .transform(production('babelify'))
    .bundle().pipe(source('index.js')).pipe(buffer()).pipe(sourceMaps.init({
        loadMaps : true
    }))
    // .pipe(production(uglify()))
    .pipe(sourceMaps.write('./')).pipe(gulp.dest(PUBLIC));
}

function tslint() {
    console.log('Linting...');
    return gulp.src('./src/**/*.ts').pipe(typeScriptLint({
        configuration : 'tslint.json',
        formatter : 'verbose'
    })).pipe(typeScriptLint.report({
        emitError : false,
        summarizeFailureOutput : true
    }));
}

// Cleaning tasks --------------------------------------

gulp.task('clean-all', function(callback) {
    return del([
            ES5, PUBLIC
    ], callback);
});

gulp.task('clean-fast', [
        'clean-api', 'clean-ui-fast'
]);

gulp.task('clean-api', function(callback) {
    return del([
        ES5
    ], callback);
});

gulp.task('clean-ui-all', function(callback) {
    return del([
        PUBLIC
    ], callback);
});

gulp.task('clean-ui-fast', function(callback) {
    return del([
            PUBLIC + '/**/*',
            PUBLIC + '/**/*.*',
            '!' + PUBLIC,
            '!' + PUBLIC + '/bower_components',
            '!' + PUBLIC + '/bower_components/**'
    ], callback);
});


// Transformation tasks --------------------------------------

gulp.task('default', [
    'start'
]);

gulp.task('build', build);
gulp.task('build-api', [
    'transpile'
]);
gulp.task('build-ui', [
    'build'
]);

gulp.task('transpile', [
    'transpile-ts'
]);

gulp.task('transpile-ts', function(){
    return transpile(SRC + '/tsconfig.json');
});

gulp.task('transpile-ts-tests', function(){
    return transpile(TESTS + '/tsconfig.json');
});

gulp.task('transcribe-css', transcribeCss);
gulp.task('transcribe-html', transcribeHtml);
gulp.task('transcribe-images', transcribeImages);
gulp.task('transcribe-ui-js', transcribeUiJs);

// Test tasks --------------------------------------

gulp.task('tslint', tslint);


// Misc tasks --------------------------------------

gulp.task('stop', stop);

gulp.task('start', function() {
    runSeq('stop', 'tslint', 'build', function() {
        node = nodemon({
            ext : 'css html js json sh ts',
            ignore : [
                    ES5, PUBLIC, TESTS
            ],
            legacyWatch : true,
            readable : true,
            script : ES5 + '/server/app.js',
            stdout : true
        });
        node.on('restart', function() {
            gulpUtil.log('---------- Restarted! ----------');
            tslint();
            transpile();
            transcribeCss();
            transcribeHtml();
            transcribeImages();
            transcribeUiJs();
        });
    });
});


process.on('exit', stop);
