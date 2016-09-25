import { By }              from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';

import { BoardComponent } from './board.component';

// let componentUnderTest: BoardComponent;
let fixture: ComponentFixture<BoardComponent>;
let debugElement: DebugElement;

describe('BoardComponent', () => {

    beforeEach(() => {
       TestBed.configureTestingModule({
           declarations: [BoardComponent]
       });

       fixture = TestBed.createComponent(BoardComponent);
       debugElement = fixture.debugElement.query(By.css('.ticTacToe--board'));
    });

    describe('onSelect', () => {
        it('should set an X and change to the computer\'s turn, when appropriate', () => { });
        it('should do nothing if the selected sell is not empty', () => { });
        it('should do nothing if it is not the human\'s turn', () => { });
    });

    describe('advance', () => {
        it('should set the human as the winner when the board is in an appropriate state', () => { });
        it('should give the computer a turn when the human has not won', () => { });
        it('should set the computer as the winner when the computer makes a winning move', () => { });
        it('should return control to the human when the computer does not make a winning move', () => { });
    }); 
});
