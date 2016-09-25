import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { BoardComponent } from './board.component';

describe("BoardComponent", () => {
    describe("onSelect", () => {
        it("should set an X and change to the computer's turn, when appropriate", ()=> {});
        it("should do nothing if the selected sell is not empty", ()=> {});
        it("should do nothing if it is not the human's turn", ()=> {});
    });
    
    describe("advance", () => {
        it("should set the human as the winner when the board is in an appropriate state", ()=> {});
        it("should give the computer a turn when the human has not won", ()=> {});
        it("should set the computer as the winner when the computer makes a winning move", ()=> {});
        it("should return control to the human when the computer does not make a winning move", ()=> {});
    }); 
});