import { async, TestBed } from '@angular/core/testing';
import { AdjudicatorService } from './adjudicator.service';
import { AnnouncerService } from './announcer.service';
import { BoardComponent } from './board.component';
import { CellComponent } from './cell.component';
import { OpponentService } from './opponent.service';
import Cell from './cell';
import Ending from './ending';
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
    describe( 'template', () => {
        it( 'should render list', async(() => {
            TestBed.configureTestingModule( {
                declarations: [BoardComponent, CellComponent]
            });

            TestBed.compileComponents().then(() => {
                const fixture = TestBed
                    .overrideComponent( BoardComponent, {
                        set: {
                            providers: [
                                { provide: AdjudicatorService, useClass: MockAdjudicatorService },
                                { provide: AnnouncerService, useClass: MockAnnouncerService },
                                { provide: OpponentService, useClass: MockOpponentService },
                            ]
                        }
                    })
                    .createComponent( BoardComponent );
                const componentUnderTest = fixture.nativeElement;
                fixture.componentInstance.cells = [new Cell( 1 )];
                fixture.detectChanges();
                expect( componentUnderTest.querySelectorAll( 'cell' ).length ).toBe( 1 );
            });
        }) );
    });
});
