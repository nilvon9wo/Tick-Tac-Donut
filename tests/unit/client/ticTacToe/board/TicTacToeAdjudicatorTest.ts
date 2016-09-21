/// <reference path='../../../../../declarations/Jasmine-Jquery/Jasmine-Jquery.d.ts' />      
      
import TicTacToeAdjudicator from '../../../../../src/client/ticTacToe/board/TicTacToeAdjudicator';
import TicTacToeBoard from '../../../../../src/client/ticTacToe/board/TicTacToeBoard';
import TicTacToeJudge from '../../../../../src/client/ticTacToe/board/TicTacToeJudge';
import TicTacToeStateStatus from '../../../../../src/client/ticTacToe/TicTacToeStateStatus';

describe('TicTacToeAdjudicator', () => {      
    
    describe ('checkDiagnals', () => {
        it('should decide X wins when X is in positions 0, 4, and 8', () => {     
            // Arrange        
            const board:TicTacToeBoard = null; // TODO: new MockBoard();
            const judge:TicTacToeJudge = null; // TODO: new MockJudge();
            const adjudicator = new TicTacToeAdjudicator(board, judge);
            
            // Act        
            const result = adjudicator.checkDiagnals();
            
            // Assert
            expect(result).toEqual(TicTacToeStateStatus.X_WON);
        });       
    });
    
    describe ('checkColumns', () => {
        it('should ...', () => {     
            // Arrange        

            // Act        
            
            // Assert
        });       
    });

    describe ('checkRows', () => {
        it('should ...', () => {     
            // Arrange        

            // Act        
            
            // Assert
        });       
    });
    
    describe ('isDraw', () => {
        it('should ...', () => {     
            // Arrange        

            // Act        
            
            // Assert
        });       
    });
}); 
