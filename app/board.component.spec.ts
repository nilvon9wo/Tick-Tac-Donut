import { By }              from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';

import { BoardComponent } from './board.component';
import { AdjudicatorService } from './adjudicator.service';
import { AnnouncerService } from './announcer.service';
import { OpponentService } from './opponent.service';
import Marker from './marker.enum';

// let componentUnderTest: BoardComponent;
let fixture: ComponentFixture<BoardComponent>;
let debugElement: DebugElement;

class MockAdjudicatorService {}
class MockAnnouncerService {}
class MockOpponentService {}

describe('BoardComponent', () => {

    beforeEach(() => {
       TestBed.configureTestingModule({
           declarations: [BoardComponent],
           providers: [
                       {provide: AdjudicatorService, useClass: MockAdjudicatorService}, 
                       {provide: AnnouncerService, useClass: MockAnnouncerService}, 
                       {provide: OpponentService, useClass: MockOpponentService} 
           ]
       });
    });

    
    
    xdescribe('onSelect', () => {
        /*
        xit('should set an X and change to the computer\'s turn, when appropriate', async() => { 
            TestBed.compileComponents().then(() => {
                // Arrange
                const fixture = TestBed.createComponent(BoardComponent);
                const componentUnderTest = fixture.nativeElement;
                const state = componentUnderTest.state;
                const cell = state.cells[0];
                
                // Act
                componentUnderTest.onSelect(cell);
                
                // Assert
                expect(state.turn).toEqual(Marker.O);
                expect(cell['marker']).toEqual(Marker.X);
                // TODO: Test Advance;
            });
        });
        it('should do nothing if the selected sell is not empty', () => { });
        it('should do nothing if it is not the human\'s turn', () => { });
        */
    });

    describe('advance', () => {
        it('should set the human as the winner when the board is in an appropriate state', () => { });
        it('should give the computer a turn when the human has not won', () => { });
        it('should set the computer as the winner when the computer makes a winning move', () => { });
        it('should return control to the human when the computer does not make a winning move', () => { });
    }); 
});
