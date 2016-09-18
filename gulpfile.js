var SRC = 'src';
var ES5 = 'es5';
var CLIENT = __dirname + '/public';

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

function transpile() {
    console.log('Transpiling...');
    var tsProject = typeScript.createProject('src/tsconfig.json');
    return tsProject.src().pipe(typeScript(tsProject)).js.pipe(gulp.dest(ES5));
}

function transcribeCss() {
    console.log('Transcribing CSS...');
    return gulp.src([
        SRC + '/**/*.css'
    ]).pipe(concatCss('index.css')).pipe(gulp.dest(CLIENT));
}

function transcribeHtml() {
    console.log('Transcribing HTML...');
    return gulp.src([
        SRC + '/**/*.html'
    ]).pipe(gulp.dest(CLIENT));
}

function transcribeImages() {
    console.log('Transcribing Images...');
    return gulp.src([
        SRC + '/**/*.png'
    ]).pipe(gulp.dest(CLIENT));
}

function transcribeUiJs() {
    console.log('Transcribing UI JavaScript...');
    function pointTo(scripts) {
        return scripts.map(function(script) {
            return ES5 + '/' + script + '.js';
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
    .pipe(sourceMaps.write('./')).pipe(gulp.dest(CLIENT));
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
            ES5, CLIENT
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
        CLIENT
    ], callback);
});

gulp.task('clean-ui-fast', function(callback) {
    return del([
            CLIENT + '/**/*',
            CLIENT + '/**/*.*',
            '!' + CLIENT,
            '!' + CLIENT + '/bower_components',
            '!' + CLIENT + '/bower_components/**'
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
gulp.task('transpile-ts', transpile);
gulp.task('transcribe-css', transcribeCss);
gulp.task('transcribe-html', transcribeHtml);
gulp.task('transcribe-images', transcribeImages);
gulp.task('transcribe-ui-js', transcribeUiJs);

// Misc tasks --------------------------------------

gulp.task('stop', stop);

gulp.task('start', function() {
    runSeq('stop', 'tslint', 'build', function() {
        node = nodemon({
            ext : 'css html js json sh ts',
            ignore : [
                    ES5, CLIENT
            ],
            legacyWatch : true,
            readable : true,
            script : ES5 + '/app.js',
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

gulp.task('tslint', tslint);

process.on('exit', stop);
