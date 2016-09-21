/// <reference path="../../../../../declarations//jasmine/jasmine.d.ts" />
/// <reference path='../../../../../declarations/Jasmine-Jquery/Jasmine-Jquery.d.ts' />      
      
import TicTacToeAdjudicator from '../../../../../src/client/ticTacToe/board/TicTacToeAdjudicator';
import TicTacToeAnnouncer from '../../../../../src/client/ticTacToe/board/TicTacToeAnnouncer';
import TicTacToeBoard from '../../../../../src/client/ticTacToe/board/TicTacToeBoard';
import TicTacToeMarker from '../../../../../src/client/ticTacToe/markers/TicTacToeMarker';
import TicTacToeStateStatus from '../../../../../src/client/ticTacToe/TicTacToeStateStatus';

describe('TicTacToeAdjudicator', () => {      
    
    class MockTicTacToeBoard extends TicTacToeBoard {
        constructor(cellPositions: Array<number>, winner: TicTacToeMarker) {
            super();
            cellPositions.forEach(position => {
                this.insertAt(position, winner);
            });
        }
    }
    
    class MockTicTacToeAnnouncer extends TicTacToeAnnouncer {
        public winningCells: Array<number>;
        public markWinner (winningCells: Array<number>) {
            this.winningCells = winningCells;
        }
    }
    
    describe ('checkRows', () => {
        it('should decide X wins when X is in positions 0, 1, and 2', () => {     
        // Arrange
            const winningCells = [0, 1, 2];
        const board = new MockTicTacToeBoard(winningCells, TicTacToeMarker.X);
        const announcer = new MockTicTacToeAnnouncer();
        const adjudicator = new TicTacToeAdjudicator(board, announcer);
        
        // Act        
        const result = adjudicator.checkRows();
        
        // Assert
        expect(result).toEqual(TicTacToeStateStatus.X_WON);
        expect(announcer.winningCells).toEqual(winningCells);
        });       
    });

    describe ('checkColumns', () => {
        it('should decide X wins when X is in positions 0, 4, and 8', () => {     
            // Arrange        

            // Act        
            
            // Assert
        });       
    });

    describe ('checkDiagnals', () => {
        it('should decide X wins when X is in positions 0, 4, and 8', () => {     
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
