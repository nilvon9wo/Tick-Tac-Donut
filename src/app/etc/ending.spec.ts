import Ending  from './ending';
import Marker  from './marker.enum';

describe( 'Ending', () => {
    describe( 'constructor', () => {
        it( 'should store the value of the winner and the winning positions', () => {
            // Arrange
            const testMarker = Marker.X;
            const testLine = [0, 1, 2];

            // Act
            const result = new Ending( testMarker, testLine );

            // Asset
            expect( result.winner ).toEqual( Marker.X );
            expect( result.line ).toBe( testLine );
        });
    });

    describe( 'hasWinner', () => {
        it( 'should return true when the ending stores a winning marker', () => {
            // Arrange
            const testEnding = new Ending( Marker.X, [0, 1, 2] );

            // Act
            const result = testEnding.hasWinner();

            // Assert
            expect( result ).toEqual( true );
        });

        it( 'should return false when the ending does not store a winning marker', () => {
            // Arrange
            const testEnding = new Ending( undefined, undefined );

            // Act
            const result = testEnding.hasWinner();

            // Assert
            expect( result ).toEqual( false );
        });
    });
});
