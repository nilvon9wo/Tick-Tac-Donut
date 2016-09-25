import { Injectable } from '@angular/core';

import Cell from './cell';
import Ending  from './ending';
import Marker from './marker.enum';

@Injectable()
export class AnnouncerService {
    public displayVictor(ending: Ending, cells: Array<Cell>) {
        if (ending.hasWinner()) {
            ending.line.forEach(position => {
                cells[position].declareWinner();
            });
        }
    }
}