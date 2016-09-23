import { Injectable } from '@angular/core';

import { Cell } from './cell';
import { State } from './state';

@Injectable()
export class OpponentService {
    public advanceTo(state: State) {
        /*
        if (state.winner) {
            // TODO
        } else {
            const nextPlayer = this.nextUp();
            if (nextPlayer === this.human) {
                this.view.switchViewTo(TicTacToeGameViewState.HUMAN);
            } else {
                this.view.switchViewTo(TicTacToeGameViewState.COMPUTER);
                this.computer.takeTurn(state);
            }
        }
        */
    }
}