import Cell from '../cells/cell';
import Marker from './marker.enum';
import State from './state';

describe ('State', () => {
    function assertAllEmptyCells(cells: Array<Cell>) {
        for (let i = 0; i <= cells.length - 1; i++) {
            expect(cells[i]['marker']).toBeUndefined();
        }
    }

    describe ('constructor', () => {
        it ('should create a new array of unclaimed cells and the first turn should belong to X', () => {
            // Arrange
            // Nothing to do here

            // Act
            const result = new State();

            // Assert
            expect(result.cells.length).toEqual(9);
            assertAllEmptyCells(result.cells);
            expect(result.turn).toEqual(Marker.X);
            expect(result.winner).toBeUndefined();
        });
    });

    describe ('emptyCells', () => {
        it ('should return all cells for a new state', () => {
            // Arrange
            const testState = new State();

            // Act
            const result = testState.emptyCells();

            // Assert
            expect(result.length).toEqual(9);
            assertAllEmptyCells(result);
        });

        it ('should not return the first cell when it is taken', () => {
            // Arrange
            const testState = new State();
            testState.cells[0]['marker'] = Marker.X;

            // Act
            const result = testState.emptyCells();

            // Assert
            expect(result.length).toEqual(8);
            expect(result[0]['id']).toEqual(1);
            assertAllEmptyCells(result);
        });

        it ('should return an empty list when all cells are taken', () => {
            // Arrange
            const testState = new State();
            testState.cells.forEach(cell => {
                cell['marker'] = Marker.X;
            });

            // Act
            const result = testState.emptyCells();

            // Assert
            expect(result.length).toEqual(0);
        });
    });

    describe ('setWinner', () => {
        it ('should set the winner to the specified marker and the turn property should be deleted', () => {
            // Arrange
            const testState = new State();
            const testWinner = Marker.X;

            // Act
            testState.setWinner(testWinner);

            // Assert
            expect(testState.winner).toEqual(testWinner);
            expect(testState.turn).toBeUndefined();
        });
    });

    describe ('toggleTurn', () => {
        it ('should set the turn to X when the previous value was O', () => {
            // Arrange 
            const testState = new State();
            testState.turn = Marker.X;

            // Act 
            testState.toggleTurn();

            // Assert
            expect(testState.turn).toEqual(Marker.O);
        });

        it ('should set the turn to O when the previous value was X', () => {
            // Arrange 
            const testState = new State();
            testState.turn = Marker.O;

            // Act 
            testState.toggleTurn();

            // Assert
            expect(testState.turn).toEqual(Marker.X);
        });
    });
});
