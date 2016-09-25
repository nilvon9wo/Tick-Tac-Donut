import { Injectable } from '@angular/core';

import { State } from './state';

@Injectable()
export class OpponentService {
    public takeTurn(state: State) {
        const availableCells = state.emptyCells();
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        randomCell.setMarker(state.computer);
        return state;
    }
}
