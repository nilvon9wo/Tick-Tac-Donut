import { AnnouncerService } from './announcer.service';
import Cell from '../cells/cell';
import Ending from '../etc/ending';
import Marker from '../etc/marker.enum';

/* tslint:disable */
describe( 'AnnouncerService', () => {
    let serviceUnderTest: AnnouncerService;

    beforeEach(() => {
        serviceUnderTest = new AnnouncerService();
    });

    function createCells() {
        let cells = new Array<Cell>();
        for ( let i = 0; i <= 8; i++ ) {
            cells.push( new Cell( i ) );
        }
        return cells;
    }

    it( 'should marking winning cells, if there is a winner', () => {
        // Arrange
        const winningPositions = [0, 1, 2];
        const testEnding = new Ending( Marker.X, winningPositions );
        const testCells = createCells();
        // Act
        serviceUnderTest.displayVictor( testEnding, testCells );
        // Assert
        for ( let i = 0; i <= 8; i++ ) {
            const resultBackground = testCells[i]['background'];
            const isWinning = winningPositions.indexOf( i ) > -1;
            const expectedBackground = isWinning ? 'winner' : 'background';
            expect( resultBackground ).toEqual( expectedBackground );
        }
    });

    it( 'should not mark any cells, if there is no winner', () => {
        // Arrange
        const testEnding = new Ending( undefined, undefined );
        const testCells = createCells();
        // Act
        serviceUnderTest.displayVictor( testEnding, testCells );
        // Assert
        for ( let i = 0; i <= 8; i++ ) {
            const resultBackground = testCells[i]['background'];
            expect( resultBackground ).toEqual( 'background' );
        }
    });
});
