import { async, TestBed } from '@angular/core/testing';
import { AdjudicatorService } from './adjudicator.service';
import { AnnouncerService } from './announcer.service';
import { BoardComponent } from './board.component';
import { CellComponent } from './cell.component';
import { CellsDaoService } from './cells-dao.service';
import { OpponentService } from './opponent.service';
import Cell from './cell';

class MockAdjudicatorService extends AdjudicatorService {}
class MockAnnouncerService extends AnnouncerService {}
class MockOpponentService extends OpponentService {}
class MockCellsDaoService extends CellsDaoService {}

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
                                { provide: CellsDaoService, useClass: MockCellsDaoService }
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
