import { async, TestBed } from '@angular/core/testing';
import { BoardComponent } from '../board/board.component';
import { CellComponent } from '../cells/cell.component';
import { CellsDaoService } from '../cells/cells-dao.service';
import { TicTacToeComponent } from './ticTacToe.component';

class MockCellsDaoService extends CellsDaoService { }

describe( 'TicTacToeComponent', () => {
    describe( 'template', () => {
        it( 'should render a board', async(() => {
            TestBed.configureTestingModule( {
                declarations: [TicTacToeComponent, BoardComponent, CellComponent]
            });

            TestBed.compileComponents().then(() => {
                const fixture = TestBed
                    .overrideComponent( TicTacToeComponent, {
                        set: {
                            providers: [
                                { provide: CellsDaoService, useClass: MockCellsDaoService }
                            ]
                        }
                    })
                    .createComponent( TicTacToeComponent );

                const componentUnderTest = fixture.nativeElement;
                expect( componentUnderTest.querySelectorAll( 'board' ).length ).toBe( 1 );
            });
        }) );
    });
});
