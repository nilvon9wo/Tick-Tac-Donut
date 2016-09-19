//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '.',

    files: [
        // paths loaded by Karma
        {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true},
        {pattern: 'public/bower_components/angular/angular.js', included: true, watched: true},
        {pattern: 'public/bower_components/angular-route/angular-route.js', included: true, watched: true},
        {pattern: 'public/bower_components/angular-mocks/angular-mocks.js', included: true, watched: true},
        {pattern: 'karma-test-shim.js', included: true, watched: true},
     
                // paths loaded via module imports
        {pattern: 'es5/**/*.js', included: false, watched: true},
     
                // paths to support debugging with source maps in dev tools
        {pattern: 'src/**/*.ts', included: false, watched: false},
        {pattern: 'es5/**/*.js.map', included: false, watched: false}
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-phantomjs-launcher'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    
    port: 9876,
    
    logLevel: config.LOG_INFO,

    colors: true,

    autoWatch: true,
    
    // Coverage reporter generates the coverage
    reporters: ['progress', 'dots', 'coverage'],

    // Source files that you wanna generate coverage for.
    // Do not include tests or libraries (these files will be instrumented by Istanbul)
    preprocessors: {
        'dist/**/!(*spec).js': ['coverage']
    },

    coverageReporter: {
        reporters:[
            {type: 'json', subdir: '.', file: 'coverage-final.json'}
        ]
    },

    singleRun: true    

  });
};
