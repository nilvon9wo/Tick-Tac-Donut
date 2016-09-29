import { AdjudicatorService } from '../services/adjudicator.service';
import { AnnouncerService } from '../services/announcer.service';
import { BoardComponent } from './board.component';
import { CellsDaoService } from '../cells/cells-dao.service';
import { OpponentService } from '../services/opponent.service';
import { TestBed } from '@angular/core/testing';
import Cell from '../cells/cell';
import Ending from '../etc/ending';
import Marker from '../etc/marker.enum';
import State from '../etc/state';

class MockAdjudicatorService extends AdjudicatorService {
    ending: Ending;

    constructor() {
        super();
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

class MockCellsDaoService extends CellsDaoService {
    markersDeleted = false;
    markersSaved = false;

    deleteMarkers() {
        this.markersDeleted = true;
    }

    saveMarkers() {
        this.markersDeleted = true;
    }
}

let mockAdjudicatorService: MockAdjudicatorService;
let mockAnnouncerService: MockAnnouncerService;
let mockOpponentService: MockOpponentService;
let mockCellsDaoService: MockCellsDaoService;
let componentUnderTest: BoardComponent

describe( 'BoardComponent', () => {
    
    beforeEach(() => {
        mockAdjudicatorService = new MockAdjudicatorService();
        mockAnnouncerService = new MockAnnouncerService();
        mockOpponentService = new MockOpponentService();
        mockCellsDaoService = new MockCellsDaoService();
        componentUnderTest = new BoardComponent(
                mockAdjudicatorService,
                mockAnnouncerService,
                mockOpponentService,
                mockCellsDaoService
                );
    });

    describe( 'onSelect', () => {
        it( 'should set an X and change to the computer\'s turn, when appropriate', () => {
            TestBed.compileComponents().then(() => {
                // Arrange
                const testHumanMarker = Marker.X;
                componentUnderTest.state.turn = testHumanMarker;
                const cell = componentUnderTest.cells[0];

                // Act
                componentUnderTest.onSelect( cell );

                // Assert
                expect( componentUnderTest.state.turn ).toEqual( Marker.O );
                expect( cell['marker'] ).toEqual( Marker.X );
                expect( mockOpponentService.tookTurn ).toEqual( true );
                expect( mockCellsDaoService.markersSaved ).toEqual( true );
            });
        });

        it( 'should do nothing if the selected cell is not empty', () => {
            // Arrange
            const testHumanMarker = Marker.X;
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
            // Arrange
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
            mockAdjudicatorService.setEnding(new Ending( testHumanMarker, testWinningPositions ));
            componentUnderTest.state.turn = Marker.X;

            // Act
            componentUnderTest.advance();

            // Assert
            expect( componentUnderTest.state.winner ).toEqual( testHumanMarker );
            expect( mockAnnouncerService.ending.winner ).toEqual( testHumanMarker );
            expect( mockAnnouncerService.ending.line ).toEqual( testWinningPositions );
            expect( mockAnnouncerService.cells ).toEqual( componentUnderTest.cells );
            expect( componentUnderTest.state.turn ).toEqual( undefined );
            expect( mockCellsDaoService.markersDeleted ).toEqual( true );
        });

        it( 'should give the computer a turn when the human has not won', () => {
            // Arrange
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
            mockOpponentService = new MockOpponentService(() => {
                mockAdjudicatorService.setEnding( new Ending( testComputerMarker, testWinningPositions ) );
            });
            componentUnderTest = new BoardComponent(
                    mockAdjudicatorService,
                    mockAnnouncerService,
                    mockOpponentService,
                    mockCellsDaoService
                    );
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
            expect( mockCellsDaoService.markersDeleted ).toEqual( true );
        });
    });
});
