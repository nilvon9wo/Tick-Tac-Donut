import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By }              from '@angular/platform-browser';
import { ComponentFixture, async, inject, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';

import { CellComponent } from './cell.component';
import Cell from './cell';
import Marker from './marker.enum';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe("CellComponent", () => {
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CellComponent]
        });
        
        this.fixture = TestBed.createComponent(CellComponent);
    });

    it ('should render a cell', async(() => {
        // Arrange
        const outerDiv = this.fixture.nativeElement;
        const testId = 1;
        const testMarker = Marker.X;
        const testCell: Cell = new Cell(1);
        testCell.setMarker(testMarker);
        const componentUnderTest = this.fixture.componentInstance.cell = testCell;
        this.fixture.detectChanges();

        //const innerDiv = this.fixture.debugElement.query(By.css('div div'));
        
        console.log('###### outerDiv', outerDiv);
        // Act
    }));
         
});