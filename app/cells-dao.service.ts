import { Injectable } from '@angular/core';

import Cell from './cell';
import Marker from './marker.enum';

@Injectable()
export class CellsDaoService {
    public deleteMarkers() {
        for (let i = 0; i <= 8; i++) {
            localStorage.removeItem('cell_' + i);
        }
    }

    public loadMarkers(cells: Array<Cell>): Array<Cell> {
        for (let i = 0; i <= 8; i++) {
            const marker: string = localStorage.getItem('cell_' + i);
            if (marker) {
                const cellMarker: Marker = Marker[marker];
                cells[i].setMarker(cellMarker);
            }
        }
        return cells;
    }

    public saveMarkers(cells: Array<Cell>) {
        for (let i = 0; i <= 8; i++) {
            localStorage.setItem('cell_' + i, cells[i].displayMarker());
        }
    }
}
