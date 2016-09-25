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

    function playerShouldWinTest(testPlayer: Marker, testRequiredPositions: Array<number>){
        // Arrange
        const testState = createTestState(testPlayer, testRequiredPositions);
        // Act
        const result = serviceUnderTest.judge(testState);
        // Assert
        expect(result.winner).toEqual(testPlayer);
        const sortedResultLine = result.line.sort(); 
        const sortedRequiredPositionsd = testRequiredPositions.sort(); 
        expect(sortedResultLine[0]).toEqual(sortedRequiredPositionsd[0]);
        expect(sortedResultLine[1]).toEqual(sortedRequiredPositionsd[1]);
        expect(sortedResultLine[2]).toEqual(sortedRequiredPositionsd[2]);
    }

    
    describe("judge", () => {
        it("should declare X the winner when X is in positions 0, 1, and 2", () => {
            playerShouldWinTest(Marker.X, [0,1,2]);
        });
    });
});