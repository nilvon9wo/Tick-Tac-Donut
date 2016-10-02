import { Component, Input, OnInit } from '@angular/core';
import { AdjudicatorService } from '../services/adjudicator.service';
import { AnnouncerService } from '../services/announcer.service';
import { CellsDaoService } from '../cells/cells-dao.service';
import { OpponentService } from '../services/opponent.service';
import Cell from '../cells/cell';
import Marker from '../etc/marker.enum';
import State from '../etc/state';

@Component( {
    providers: [AdjudicatorService, AnnouncerService, CellsDaoService, OpponentService],
    selector: 'board',
    styles: [require('./board.component.css')],
    template: require('./board.component.html')
})

export class BoardComponent {
    @Input() public state: State;
    public cells: Array<Cell> = [];

    constructor(
        private adjudicatorService: AdjudicatorService,
        private announcerService: AnnouncerService,
        private opponentService: OpponentService,
        private cellsDao: CellsDaoService
    ) {
    }

    ngOnInit(){
        this.cells = this.cellsDao.loadMarkers( this.state.cells );
    }
    
    public onSelect( cell: Cell ) {
        if ( cell.isEmpty() && this.state.turn === this.state.human ) {
            this.state.toggleTurn();
            cell.setMarker( Marker.X );
            this.advance();
        }
    }

    public advance() {
        const humanResult = this.adjudicatorService.judge( this.state );
        if ( humanResult ) {
            this.state.setWinner( humanResult.winner );
            this.announcerService.displayVictor( humanResult, this.cells );
            this.cellsDao.deleteMarkers();
        } else {
            this.state = this.opponentService.takeTurn( this.state );
            const computerResult = this.adjudicatorService.judge( this.state );
            if ( computerResult ) {
                this.state.setWinner( computerResult.winner );
                this.announcerService.displayVictor( computerResult, this.cells );
                this.cellsDao.deleteMarkers();
            } else {
                this.cellsDao.saveMarkers( this.cells );
                this.state.toggleTurn();
            }
        }
    }
}
