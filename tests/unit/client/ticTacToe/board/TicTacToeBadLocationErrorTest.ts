/// <reference path='../../../../../declarations/jasmine/jasmine.d.ts' />     
/// <reference path='../../../../../declarations/Jasmine-Jquery/Jasmine-Jquery.d.ts' />      
/// <reference path='../../../../../declarations/karma/karma.d.ts' />        
      
import TicTacToeBadLocationError from '../../../../../src/client/ticTacToe/board/TicTacToeBadLocationError.ts';     

class TestClass {
    public testMethod(testMessage: string) {
        throw new TicTacToeBadLocationError(testMessage);
    }
}

describe( "TicTacToeBadLocationError", () => {      
    
    it( "should extend error and throw message to the super constructor", () => {     
        // Arrange        
        const testClass = new TestClass();
        const testMessage = "Test Message";
        let errorCaught = false;
        let errorMessage: String;

        // Act        
        try {
            testClass.testMethod(testMessage);
        }
        catch (error) {
            errorCaught = true;
            errorMessage = error.message;
        }
        
        // Assert
        expect(errorCaught).toBe(true);
        expect(errorMessage).toEqual(testMessage);
    });       
}); 
