import { Component } from '@angular/core';
import State from '../etc/state';

@Component( {
    selector: 'tic-tac-toe',
//    styles: [require('./ticTacToe.component.css')],
    template: require('./ticTacToe.component.html')
})

export class TicTacToeComponent {
    public state: State;

    constructor(){
        this.state = new State();
    }
}
