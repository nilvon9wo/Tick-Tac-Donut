import { async, TestBed } from '@angular/core/testing';
import { CellComponent } from './cell.component';
import Cell from './cell';
import Marker from './marker.enum';

describe('CellComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CellComponent]
        });
    });

    it ('should render a cell', async(() => {
        TestBed.compileComponents().then(() => {
            // Arrange
            const fixture = TestBed.createComponent(CellComponent);
            const componentUnderTest = fixture.nativeElement;
            const testId = 1;
            const testMarker = Marker.X;
            const testCell = new Cell(testId);
            testCell['marker'] = testMarker;

            // Act
            fixture.componentInstance.cell = testCell;

            // Assert
            fixture.detectChanges();
            expect(componentUnderTest.querySelectorAll('div.ticTacToe--board-cell').length).toBe(1);
            expect(componentUnderTest.querySelectorAll('div.ticTacToe--board-cell--background').length).toBe(1);
            expect(componentUnderTest.querySelectorAll('div.ticTacToe--board-cell--X').length).toBe(1);
            expect(componentUnderTest.querySelectorAll('div.ticTacToe--board-cell--X')[0].innerText).toBe('X');
        });
    }));
});
