import { CellsDaoService } from './cells-dao.service';
import Cell from './cell';
import Marker from '../etc/marker.enum';

describe( 'CellsDaoService', () => {
    let serviceUnderTest: CellsDaoService;

    beforeEach(() => {
        serviceUnderTest = new CellsDaoService();
    });

    describe( 'deleteMarkers', () => {
        it( 'should delete cells-marker representations from local storage', () => {
            // Arrange
            const removeBackup = localStorage.removeItem;
            const removed: Array<string> = [];
            localStorage.removeItem = ( item ) => {
                removed.push( item );
            };

            // Act
            serviceUnderTest.deleteMarkers();

            // Assert
            expect( removed.length ).toEqual( 9 );

            // Clean up
            localStorage.removeItem = removeBackup;
        });
    });

    describe( 'loadMarkers', () => {
        it( 'should load cells-marker representations from local storage', () => {
            // Arrange
            const getBackup = localStorage.getItem;
            localStorage.getItem = () => 'X';

            const testCells: Array<Cell> = ( function() {
                const cells: Array<Cell> = [];
                for ( let i = 0; i <= 8; i++ ) {
                    cells.push( new Cell( i ) );
                }
                return cells;
            } () );

            // Act
            const resultCells = serviceUnderTest.loadMarkers( testCells );

            // Assert
            for ( let i = 0; i <= 8; i++ ) {
                expect (resultCells[i].getMarker()).toEqual(Marker.X);
            }

            // Clean up
            localStorage.getItem = getBackup;
        });
    });

    describe( 'saveMarkers', () => {
        it( 'should save cells-marker representations into local storage', () => {
            // Arrange
            const setBackup = localStorage.setItem;
            const savedMarkers: Array<string> = [];
            localStorage.setItem = ( item, value ) => {
                savedMarkers[item] = value;
            };
            const testCells: Array<Cell> = ( function() {
                const cells: Array<Cell> = [];
                for ( let i = 0; i <= 8; i++ ) {
                    cells.push( new Cell( i ) );
                }
                return cells;
            } () );
            testCells[0].setMarker( Marker.X );
            testCells[1].setMarker( Marker.O );

            // Act
            serviceUnderTest.saveMarkers( testCells );

            // Assert
            expect( savedMarkers['cell_0'] ).toEqual( 'X' );
            expect( savedMarkers['cell_1'] ).toEqual( 'O' );

            // Clean up
            localStorage.setItem = setBackup;
        });
    });
});
