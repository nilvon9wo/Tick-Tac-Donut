//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '.',

    files: [
        'https://code.jquery.com/jquery-3.1.0.min.js',
        {pattern: 'public/bower_components/angular/angular.js', included: true, watched: true},
        {pattern: 'public/bower_components/angular-route/angular-route.js', included: true, watched: true},
//        {pattern: 'public/bower_components/angular-mocks/angular-mocks.js', included: true, watched: true},
        './src/client/**/*.ts',
        './tests/unit/client/**/*.ts'
    ],

    autoWatch: true,

    frameworks: ['jasmine', 'browserify'],

    browsers: ['Chrome'],

    plugins: [
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-phantomjs-launcher',
      'karma-typescript-preprocessor'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    
    port: 9876,
    
    logLevel: config.LOG_DEBUG,

    client: {
        captureConsole: true
    },
    
    colors: true,

    autoWatch: true,
    
    // Coverage reporter generates the coverage
    reporters: ['progress', 'dots', 'coverage'],

    // Source files that you wanna generate coverage for.
    // Do not include tests or libraries (these files will be instrumented by Istanbul)
    preprocessors: {
        '**/*.ts': ['browserify', 'coverage'],
        'es5/**/!(*spec).js': ['coverage']
    },
    
    browserify: {
        debug: true,
        plugin: ['tsify'],
        transform: ['espowerify'],
        extensions: ['.ts', '.js']
    },
    
    typescriptPreprocessor: {
        options: {
          sourceMap: true, // generate source maps
          noResolve: false // enforce type resolution
        },
        transformPath: function(path) {
          return path.replace(/\.ts$/, '.js');
        }
      },

    coverageReporter: {
        reporters:[
            { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
            { type: 'html', subdir: 'report-html' },
            { type: 'json', subdir: '.', file: 'coverage-final.json'},
            { type: 'lcov', subdir: 'report-lcov' },
            { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
            { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
            { type: 'text', subdir: '.', file: 'text.txt' },
            { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
        ]
    },

    singleRun: false,
    concurrency: Infinity
  });
};
