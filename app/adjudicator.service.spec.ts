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
        // Positive (Winning) Scenarios
        it("should declare X the winner when X is in positions 0, 1, and 2", () => {
            playerShouldWinTest(Marker.X, [0,1,2]);
        });
        
        it("should declare O the winner when O is in positions 0, 3, and 6", () => {
            playerShouldWinTest(Marker.O, [0,3,6]);
        });
        
        it("should declare X the winner when X is in positions 0, 4, and 8", () => {
            playerShouldWinTest(Marker.X, [0,4,8]);
        });
        
        it("should declare O the winner when O is in positions 1, 4, and 7", () => {
            playerShouldWinTest(Marker.O, [1,4,7]);
        });
        
        it("should declare X the winner when X is in positions 2, 4, and 6", () => {
            playerShouldWinTest(Marker.X, [2,4,6]);
        });
        
        it("should declare O the winner when O is in positions 2, 5, and 8", () => {
            playerShouldWinTest(Marker.O, [2,5,8]);
        });
        
        it("should declare X the winner when X is in positions 3, 4, and 5", () => {
            playerShouldWinTest(Marker.X, [3,4,5]);
        });
        
        it("should declare O the winner when O is in positions 6, 7, and 8", () => {
            playerShouldWinTest(Marker.O, [6,7,8]);
        });
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    });
});