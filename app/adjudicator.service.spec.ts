import { AdjudicatorService } from './adjudicator.service';
import Marker  from './marker.enum';
import State from './state';

describe("AdjudicatorService", () => {
    let serviceUnderTest: AdjudicatorService;

    beforeEach(() => {
        serviceUnderTest = new AdjudicatorService();
    });
    
    function createTestState(marker: Marker, positions: Array<number>){
        const state = new State();
        positions.forEach(position => {
            state.cells[position].setMarker(marker);
        });
        return state;
    }
    
    describe("judge", () => {
        it("should declare X the winner when X is in positions 0, 1, and 2", () => {
            // Arrange
            const testPlayer = Marker.X;
            const testRequiredPositions = [0,1,2];
            const testState = createTestState(testPlayer, testRequiredPositions);
            // Act
            const result = serviceUnderTest.judge(testState);
            // Assert
            expect(result.winner).toEqual(testPlayer);
            expect(result.line[0]).toEqual(testRequiredPositions[0]);
            expect(result.line[1]).toEqual(testRequiredPositions[1]);
            expect(result.line[2]).toEqual(testRequiredPositions[2]);
        });
    });
});