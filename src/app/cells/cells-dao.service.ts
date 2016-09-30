import { Injectable } from '@angular/core';

import Cell from './cell';
import Marker from '../etc/marker.enum';

@Injectable()
export class CellsDaoService {
    public deleteMarkers() {
        for ( let i = 0; i <= 8; i++ ) {
            localStorage.removeItem( 'cell_' + i );
        }
    }

    public loadMarkers( cells: Array<Cell> ): Array<Cell> {
        for ( let i = 0; i <= 8; i++ ) {
            const marker: string | undefined = localStorage.getItem( 'cell_' + i );
            if ( marker ) {
                /* tslint:disable */
                const cellMarker: Marker = (<any>Marker)[marker];
                /* tslint:enable */
                cells[i].setMarker( cellMarker );
            }
        }
        return cells;
    }

    public saveMarkers( cells: Array<Cell> ) {
        for ( let i = 0; i <= 8; i++ ) {
            localStorage.setItem( 'cell_' + i, cells[i].displayMarker() );
        }
    }
}
