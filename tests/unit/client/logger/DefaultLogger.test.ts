/// <reference path='../../../../declarations/jasmine/jasmine.d.ts' />
/// <reference path='../../../../declarations/Jasmine-Jquery/Jasmine-Jquery.d.ts' />
/// <reference path='../../../../declarations/karma/karma.d.ts' />

import DefaultLogger = require('../../../../src/client/logger/DefaultLogger.ts');

describe( "DefaultLogger", () => {

    it( "should log texts correctly", () => {
        // Arrange
        const text = 'test text';
        const backup = console.info;
        const defaultLogger = new DefaultLogger.default();


        let result: String;
        console.info = ( text ) =>
        {
            result = text;
        };

        // Act
        defaultLogger.log(text);
        
        // Assert
        expect(result).toEqual(text);
        
        // Cleanup
        console.info = backup;
    });
});