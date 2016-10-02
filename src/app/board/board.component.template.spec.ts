import { async, TestBed } from '@angular/core/testing';
import { AdjudicatorService } from '../services/adjudicator.service';
import { AnnouncerService } from '../services/announcer.service';
import { BoardComponent } from './board.component';
import { CellComponent } from '../cells/cell.component';
import { CellsDaoService } from '../cells/cells-dao.service';
import { OpponentService } from '../services/opponent.service';
import State from '../etc/state';

class MockAdjudicatorService extends AdjudicatorService { }
class MockAnnouncerService extends AnnouncerService { }
class MockOpponentService extends OpponentService { }
class MockCellsDaoService extends CellsDaoService { }

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
                fixture.componentInstance.state = new State();
                fixture.componentInstance.ngOnInit();
                fixture.detectChanges();

                const componentUnderTest = fixture.nativeElement;
                expect( componentUnderTest.querySelectorAll( 'cell' ).length ).toBe( 9 );
            });
        }) );
    });
});
