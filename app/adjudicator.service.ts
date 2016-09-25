import { Injectable } from '@angular/core';

import Cell from './cell';
import Ending from './ending';
import Marker from './marker.enum';
import State from './state';
import Wnding from './ending';

@Injectable()
export class AdjudicatorService {
    public judge(state: State): Ending {
        const rowsStatus = this.checkRows(state.cells);
        if (rowsStatus) {
            return rowsStatus;
        }

        const columnStatus = this.checkColumns(state.cells);
        if (columnStatus) {
            return columnStatus;
        }

        const diagnalStatus = this.checkDiagnals(state.cells);
        if (diagnalStatus) {
            return diagnalStatus;
        }

        return this.checkForDraw(state);
    }
    
    private checkColumns(cells: Array<Cell>) {
        return this.checkEdgeAdjacent({
            additionalCellsRequired: [3, 6],
            cells: cells,
            cellIncrement: 1,
            cellsUntil: 2
        });
    }

    private checkRows(cells: Array<Cell>) {
        return this.checkEdgeAdjacent({
            additionalCellsRequired: [1, 2],
            cells: cells,
            cellIncrement: 3,
            cellsUntil: 6
        });
    }

    private checkDiagnals(cells: Array<Cell>) {
        for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
            const line = [i, i + j, i + 2 * j];
            const result = this.check(cells, line);
            if (result) {
                return result;
            }
        }
        return null;
    }

    public checkForDraw(state: State) {
        const available = state.emptyCells();
        if (available.length === 0) {
            return new Ending(null, null);
        } else {
            return null;
        }
    }

    private checkEdgeAdjacent(config: any) {
        for (let i = 0; i <= config.cellsUntil; i = i + config.cellIncrement) {
            const line = [i, i + config.additionalCellsRequired[0], i + config.additionalCellsRequired[1]];
            const result = this.check(config.cells, line);
            if (result) {
                return result;
            }
        }
        return null;
    }

    private check(cells: Array<Cell>, line: Array<number>) {
        let i = line[0];
        if (cells[i].isEmpty()) {
            return null;
        }
        
        
        const firstSqure = line[0];
        const secondRequiredSquare = line[1];
        const thirdRequiredSquare = line[2];
        const owner = cells[firstSqure].getMarker();
        if (
                owner === cells[secondRequiredSquare].getMarker() &&
                owner === cells[thirdRequiredSquare].getMarker()
            ) {
                return new Ending(owner, line);
            }

        return null;
    }
}