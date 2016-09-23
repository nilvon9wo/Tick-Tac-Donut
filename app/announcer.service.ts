import { Injectable } from '@angular/core';

import Cell from './cell';
import Ending  from './ending';
import InvalidPlayerError from './invalid-player.error';
import Marker from './marker.enum';
import State from './state';

@Injectable()
export class AnnouncerService {
    public displayVictor(ending: Ending, cells: Array<Cell>) {
        if (ending.winner) {
            ending.line.forEach(position => {
                cells[position].declareWinner();
            });
        }
    }
}