import { CellsDaoService } from '../cells/cells-dao.service';
import { Component } from '@angular/core';
import State from '../etc/state';

@Component( {
    providers: [CellsDaoService],
    selector: 'tic-tac-toe',
//    styles: [require('./ticTacToe.component.css')],
    template: require('./ticTacToe.component.html')
})

export class TicTacToeComponent {
    public state: State;

    constructor(private cellsDao: CellsDaoService){
        this.state = new State();
    }
    
    public clearState() {
        this.state.reset();
        this.cellsDao.deleteMarkers();
    }
}
