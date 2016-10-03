import { CellsDaoService } from '../cells/cells-dao.service';
import { TicTacToeComponent } from './ticTacToe.component';
import Marker from '../etc/marker.enum';

class MockCellsDaoService extends CellsDaoService {
    public markersDeleted = false;
    public deleteMarkers() {
        this.markersDeleted = true;
    }
}

let mockCellsDaoService: MockCellsDaoService;
let componentUnderTest: TicTacToeComponent;

describe( 'TicTacToeComponent', () => {

    beforeEach(() => {
        mockCellsDaoService = new MockCellsDaoService();
        componentUnderTest = new TicTacToeComponent( mockCellsDaoService );
    });

    describe( 'clearState', () => {
        it( 'should reset the state and delete markers from storage', () => {
            // Arrange
            componentUnderTest.state.cells[0].setMarker(Marker.X);

            // Act
            componentUnderTest.clearState();

            // Assert
            expect(componentUnderTest.state.cells[0].displayMarker()).toBe(undefined);
            expect(mockCellsDaoService.markersDeleted).toEqual(true);
        });
    });
});
