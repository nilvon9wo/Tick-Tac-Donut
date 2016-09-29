import { async, TestBed } from '@angular/core/testing';
import { CellComponent } from './cell.component';
import Cell from './cell';
import Marker from '../etc/marker.enum';

/* tslint:disable */
describe( 'CellComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule( {
            declarations: [CellComponent]
        });
    });

    it( 'should render a cell', async(() => {
        TestBed.compileComponents().then(() => {
            const elementSelector =
                ( classSuffix: string ) => 'div.ticTacToe--board-cell' + classSuffix;

            function expectOneElement( classSuffix: string ) {
                expect( componentUnderTest.querySelectorAll(
                    elementSelector( classSuffix )
                ).length ).toBe( 1 );
            }

            // Arrange
            const fixture = TestBed.createComponent( CellComponent );
            const componentUnderTest = fixture.nativeElement;
            const testId = 1;
            const testMarker = Marker.X;
            const testCell = new Cell( testId );
            testCell['marker'] = testMarker;

            // Act
            fixture.componentInstance.cell = testCell;

            // Assert
            fixture.detectChanges();
            expectOneElement( '' );
            expectOneElement( '--background' );
            expectOneElement( '--X' );
            expect( componentUnderTest.querySelectorAll(
                elementSelector( '--X' )
            )[0].innerText ).toBe( 'X' );
        });
    }) );
});
