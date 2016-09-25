import { async, inject, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ReflectiveInjector } from '@angular/core';

import { CellComponent } from './cell.component';
import Cell from './cell';
import Marker from './marker.enum';

//TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

xdescribe('CellComponent', () => {
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
            const testCell = new Cell(1);
            testCell['marker'] = testMarker;

            // Act
            componentUnderTest.cell = testCell;

            // Assert
            fixture.detectChanges();
            expect(componentUnderTest.querySelectorAll('div.ticTacToe--board-cell').length).toBe(1);
            expect(componentUnderTest.querySelectorAll('div.ticTacToe--board-cell--background').length).toBe(1);
            expect(componentUnderTest.querySelectorAll('div.ticTacToe--board-cell--X').length).toBe(1);
            expect(componentUnderTest.querySelectorAll('div.ticTacToe--board-cell--X')[0].innerText).toBe('X');
        });
    }));
});
