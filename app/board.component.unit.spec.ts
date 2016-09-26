import { AdjudicatorService } from './adjudicator.service';
import { AnnouncerService } from './announcer.service';
import { BoardComponent } from './board.component';
import { OpponentService } from './opponent.service';
import { TestBed } from '@angular/core/testing';
import Cell from './cell';
import Ending from './ending';
import Marker from './marker.enum';
import State from './state';

class MockAdjudicatorService extends AdjudicatorService {
    ending: Ending;

    constructor( ending?: Ending ) {
        super();
        this.ending = ending;
    }

    judge( state: State ) {
        return this.ending;
    }

    setEnding( ending: Ending ) {
        this.ending = ending;
    }
}

class MockAnnouncerService extends AnnouncerService {
    ending: Ending;
    cells: Array<Cell>;

    displayVictor( ending: Ending, cells: Array<Cell> ) {
        this.ending = ending;
        this.cells = cells;
    }
}

class MockOpponentService extends OpponentService {
    onTurn: () => void;
    tookTurn = false;

    constructor( onTurn?: () => void ) {
        super();
        this.onTurn = onTurn;
    }

    takeTurn( state: State ) {
        this.tookTurn = true;
        if ( this.onTurn ) {
            this.onTurn();
        }
        return state;
    }
}

describe( 'BoardComponent', () => {

    describe( 'onSelect', () => {
        it( 'should set an X and change to the computer\'s turn, when appropriate', () => {
            TestBed.compileComponents().then(() => {
                // Arrange
                const testHumanMarker = Marker.X;
                const mockAdjudicatorService = new MockAdjudicatorService();
                const mockAnnouncerService = new MockAnnouncerService();
                const mockOpponentService = new MockOpponentService();
                const componentUnderTest = new BoardComponent( mockAdjudicatorService, mockAnnouncerService, mockOpponentService );
                componentUnderTest.state.turn = testHumanMarker;
                const cell = componentUnderTest.cells[0];

                // Act
                componentUnderTest.onSelect( cell );

                // Assert
                expect( componentUnderTest.state.turn ).toEqual( Marker.O );
                expect( cell['marker'] ).toEqual( Marker.X );
                expect( mockOpponentService.tookTurn ).toEqual( true );
            });
        });

        it( 'should do nothing if the selected cell is not empty', () => {
            const testHumanMarker = Marker.X;
            const mockAdjudicatorService = new MockAdjudicatorService();
            const mockAnnouncerService = new MockAnnouncerService();
            const mockOpponentService = new MockOpponentService();
            const componentUnderTest = new BoardComponent( mockAdjudicatorService, mockAnnouncerService, mockOpponentService );
            componentUnderTest.state.turn = testHumanMarker;
            const cell = componentUnderTest.cells[0];
            cell['marker'] = Marker.O;

            // Act
            componentUnderTest.onSelect( cell );

            // Assert
            expect( componentUnderTest.state.turn ).toEqual( Marker.X );
            expect( cell['marker'] ).toEqual( Marker.O );
            expect( mockOpponentService.tookTurn ).toEqual( false );
        });

        it( 'should do nothing if it is not the human\'s turn', () => {
            const mockAdjudicatorService = new MockAdjudicatorService();
            const mockAnnouncerService = new MockAnnouncerService();
            const mockOpponentService = new MockOpponentService();
            const componentUnderTest = new BoardComponent( mockAdjudicatorService, mockAnnouncerService, mockOpponentService );
            componentUnderTest.state.turn = Marker.O;
            const cell = componentUnderTest.cells[0];
            cell['marker'] = undefined;

            // Act
            componentUnderTest.onSelect( cell );

            // Assert
            expect( componentUnderTest.state.turn ).toEqual( Marker.O );
            expect( cell['marker'] ).toEqual( undefined );
            expect( mockOpponentService.tookTurn ).toEqual( false );
        });
    });

    describe( 'advance', () => {
        it( 'should set the human as the winner when the board is in an appropriate state', () => {
            // Arrange
            const testHumanMarker = Marker.X;
            const testWinningPositions = [0, 1, 2];
            const mockAdjudicatorService = new MockAdjudicatorService( new Ending( testHumanMarker, testWinningPositions ) );
            const mockAnnouncerService = new MockAnnouncerService();
            const mockOpponentService = new MockOpponentService();
            const componentUnderTest = new BoardComponent( mockAdjudicatorService, mockAnnouncerService, mockOpponentService );
            componentUnderTest.state.turn = Marker.X;

            // Act
            componentUnderTest.advance();

            // Assert
            expect( componentUnderTest.state.winner ).toEqual( testHumanMarker );
            expect( mockAnnouncerService.ending.winner ).toEqual( testHumanMarker );
            expect( mockAnnouncerService.ending.line ).toEqual( testWinningPositions );
            expect( mockAnnouncerService.cells ).toEqual( componentUnderTest.cells );
            expect( componentUnderTest.state.turn ).toEqual( undefined );
        });

        it( 'should give the computer a turn when the human has not won', () => {
            const mockAdjudicatorService = new MockAdjudicatorService();
            const mockAnnouncerService = new MockAnnouncerService();
            const mockOpponentService = new MockOpponentService();
            const componentUnderTest = new BoardComponent( mockAdjudicatorService, mockAnnouncerService, mockOpponentService );
            componentUnderTest.state.turn = Marker.X;

            // Act
            componentUnderTest.advance();

            // Assert
            expect( mockOpponentService.tookTurn ).toEqual( true );
            expect( componentUnderTest.state.turn ).toEqual( Marker.O );
        });

        it( 'should set the computer as the winner when the computer makes a winning move', () => {
            const testComputerMarker = Marker.O;
            const testWinningPositions = [3, 4, 5];
            const mockAdjudicatorService = new MockAdjudicatorService();
            const mockAnnouncerService = new MockAnnouncerService();
            const mockOpponentService = new MockOpponentService(() => {
                mockAdjudicatorService.setEnding( new Ending( testComputerMarker, testWinningPositions ) );
            });
            const componentUnderTest = new BoardComponent( mockAdjudicatorService, mockAnnouncerService, mockOpponentService );
            componentUnderTest.state.turn = Marker.X;

            // Act
            componentUnderTest.advance();

            // Assert
            expect( mockOpponentService.tookTurn ).toEqual( true );
            expect( componentUnderTest.state.winner ).toEqual( testComputerMarker );
            expect( mockAnnouncerService.ending.winner ).toEqual( testComputerMarker );
            expect( mockAnnouncerService.ending.line ).toEqual( testWinningPositions );
            expect( mockAnnouncerService.cells ).toEqual( componentUnderTest.cells );
            expect( componentUnderTest.state.turn ).toEqual( undefined );
        });
    });
});
