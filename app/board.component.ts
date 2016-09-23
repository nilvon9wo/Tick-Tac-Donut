import { Component } from '@angular/core';
import { Cell } from './cell';
import Marker from './marker';

@Component({
  selector: 'board',
  template:`
    <div class="ticTacToe--board">
        <div *ngFor="let cell of cells" (click)="onSelect(cell)">
            <cell [cell]="cell"></cell>
        </div>
    </div>
      `
})
export class BoardComponent { 
    cells: Array<Cell> = [];
    selectedCell: Cell;
    
    constructor(){
        for (let i = 0; i <= 8; i++) {
            this.cells.push(new Cell(i));
        }
    }
    
    onSelect(cell: Cell){
        cell.setMarker(Marker.X);
    }
}
