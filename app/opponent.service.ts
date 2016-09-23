import { Injectable } from '@angular/core';

import { Cell } from './cell';
import { State } from './state';

@Injectable()
export class OpponentService {
    public takeTurn(state: State) {
        if (state.turn === state.computer) {
            const availableCells = state.emptyCells();
            const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
            randomCell.setMarker(state.computer)
        }
        state.toggleTurn();
    }
}