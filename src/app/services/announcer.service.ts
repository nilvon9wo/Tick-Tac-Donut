import { Injectable } from '@angular/core';

import Cell from '../cells/cell';
import Ending  from '../etc/ending';

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
