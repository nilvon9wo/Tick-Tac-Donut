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
    turn: Marker = Marker.X;
    
    constructor(){
        for (let i = 0; i <= 8; i++) {
            this.cells.push(new Cell(i));
        }
    }
    
    onSelect(cell: Cell){
        if (this.turn === Marker.X){
            cell.setMarker(Marker.X);
            this.toggleTurn();
        }
    }
    
    toggleTurn() {
        this.turn = (this.turn === Marker.X) ? Marker.O : Marker.X;
    }
}
