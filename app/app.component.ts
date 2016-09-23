import { Component } from '@angular/core';
import  Cell  from './Cell';
import  Marker  from './Marker';

@Component({
  selector: 'tic-tac-toe',
  template:`
    <div class="ticTacToe--board">
        <div *ngFor="let cell of cells">
            <div class="ticTacToe--board-cell--background">
                <div class="ticTacToe--board-cell--{{cell.getMarker()}}">{{cell.getMarker()}}</div>
            </div>
        </div>
    </div>
      `
})
export class AppComponent { 
    cells: Array<Cell> = [];
    
    constructor(){
        for (let i = 0; i <= 8; i++) {
            this.cells.push(new Cell(i));
        }
    }
}
