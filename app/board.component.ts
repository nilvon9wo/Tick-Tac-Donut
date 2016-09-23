import { Component } from '@angular/core';

import { AdjudicatorService } from './adjudicator.service';
import { AnnouncerService } from './announcer.service';
import Cell from './cell';
import Ending from './ending';
import Marker from './marker.enum';
import State from './state';

@Component({
  providers: [AdjudicatorService, AnnouncerService],
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
    state: State;
    
    constructor(private adjudicatorService: AdjudicatorService, private announcerService: AnnouncerService){
        this.state = new State();
        this.cells = this.state.cells;
    }
    
    onSelect(cell: Cell){
        let result: Ending;
        if (this.state.turn === Marker.X){
            cell.setMarker(Marker.X);
                result = this.adjudicatorService.judge(this.state); 
            if (result) {
                this.announcerService.displayVictor(result, this.cells);
            } else {
                // TODO: Advance
            }
        }
    }
    
}
