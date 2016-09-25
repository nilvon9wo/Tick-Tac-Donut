import { Component } from '@angular/core';

import { AdjudicatorService } from './adjudicator.service';
import { AnnouncerService } from './announcer.service';
import { OpponentService } from './opponent.service';
import Cell from './cell';
import Ending from './ending';
import Marker from './marker.enum';
import State from './state';

@Component({
  providers: [AdjudicatorService, AnnouncerService, OpponentService],
  selector: 'board',
  templateUrl: 'app/board.component.html',
  styleUrls: ['app/board.component.css']
})

export class BoardComponent {
    cells: Array<Cell> = [];
    state: State;
    
    constructor(
            private adjudicatorService: AdjudicatorService, 
            private announcerService: AnnouncerService,
            private opponentService: OpponentService
            ){
        this.state = new State();
        this.cells = this.state.cells;
    }
    
    onSelect(cell: Cell){
        let result: Ending;
        if (cell.isEmpty() && this.state.turn === this.state.human){
            this.state.toggleTurn();
            cell.setMarker(Marker.X);
            this.advance();
        }
    }
    
    advance() {
        const humanResult = this.adjudicatorService.judge(this.state);
        if (humanResult) {
            this.state.setWinner(humanResult.winner);
            this.announcerService.displayVictor(humanResult, this.cells);
        } else {
            this.state = this.opponentService.takeTurn(this.state);
            const computerResult = this.adjudicatorService.judge(this.state);
            if (computerResult) {
                this.state.setWinner(computerResult.winner);
                this.announcerService.displayVictor(computerResult, this.cells);
            } else {
                this.state.toggleTurn();
            }    
        }
   }
}
