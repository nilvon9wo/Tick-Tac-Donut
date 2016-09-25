import Cell from './cell';
import Marker from './marker.enum';

describe('Cell', () => {
    describe('constructor', () => {
        it('should create a new cell with the supplied id and no marker', () => {
            // Arrange
            const testId = 1;

            // Act
            const testCell = new Cell(testId);

            // Assert
            expect(testCell.id).toEqual(testId);
            expect(testCell['marker']).toEqual(undefined);
            expect(testCell['background']).toEqual('background');
        });
    });

    describe('displayMarker', () => {
        function testDisplayMarker(marker: Marker) {
            // Arrange
            const testCell = new Cell(1);
            testCell['marker'] = marker;

            // Act
            const result = testCell.displayMarker();

            // Assert
            expect(result).toEqual(Marker[marker]);
        }

        it('should display X when the marker is set to X', () => {
            testDisplayMarker(Marker.X);
        });

        it('should display O when the marker is set to O', () => {
            testDisplayMarker(Marker.O);
        });
    });

    describe('getMarker', () => {
        function testGetMarker(marker: Marker) {
            // Arrange
            const testCell = new Cell(1);
            testCell['marker'] = marker;

            // Act
            const result = testCell.getMarker();

            // Assert
            expect(result).toEqual(marker);
        }

        it('should return an X marker when the marker is set to X', () => {
            testGetMarker(Marker.X);
        });

        it('should return an O marker when the marker is set to O', () => {
            testGetMarker(Marker.O);
        });
    });

    describe('setMarker', () => {
        function testSetMarkerOfEmptySpace(marker: Marker) {
            // Arrange
            const testCell = new Cell(1);

            // Act
            testCell.setMarker(marker);

            // Assert
            expect(testCell['marker']).toEqual(marker);
        }

        function testSetMarkerOfOccupiedSpace(oldMarker: Marker, newMarker: Marker) {
            // Arrange
            const testCell = new Cell(1);
            testCell['marker'] = oldMarker;

            // Act
            testCell.setMarker(newMarker);

            // Assert
            expect(testCell['marker']).toEqual(oldMarker);
        }

        it('should set the cell to X when the cell is empty', () => {
            testSetMarkerOfEmptySpace(Marker.X);
        });

        it('should set the cell to O when the cell is empty', () => {
            testSetMarkerOfEmptySpace(Marker.O);
        });

        it('should keep the cell as X when the cell contains an X and there is an attempt to set X', () => {
            testSetMarkerOfOccupiedSpace(Marker.X, Marker.X);
        });

        it('should keep the cell as X when the cell contains an X and there is an attempt to set O', () => {
            testSetMarkerOfOccupiedSpace(Marker.X, Marker.O);
        });

        it('should keep the cell as O when the cell contains an X and there is an attempt to set X', () => {
            testSetMarkerOfOccupiedSpace(Marker.O, Marker.O);
        });

        it('should keep the cell as O when the cell contains an X and there is an attempt to set O', () => {
            testSetMarkerOfOccupiedSpace(Marker.X, Marker.O);
        });
    });

    describe('declareWinner', () => {
        it('should change the background to winner', () => {
            // Arrange
            const testCell = new Cell(1);

            // Act
            testCell.declareWinner();

            // Assert
            expect(testCell['background']).toEqual('winner');
        });
    });

    describe('isEmpty', () => {
        function testIsEmptyWhenNot(marker: Marker) {
            // Arrange
            const testCell = new Cell(1);
            testCell.setMarker(marker);

            // Act
            const result = testCell.isEmpty();

            // Assert
            expect(result).toEqual(false);
        }

        it('should return false if the cell has been set to X', () => {
            testIsEmptyWhenNot(Marker.X);
        });

        it('should return false if the cell has been set to O', () => {
            testIsEmptyWhenNot(Marker.O);
        });

        it('should return true if the value has not been set yet', () => {
            // Arrange
            const testCell = new Cell(1);

            // Act
            const result = testCell.isEmpty();

            // Assert
            expect(result).toEqual(true);
        });
    });
});
