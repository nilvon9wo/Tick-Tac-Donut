import Cell from './cell';
import Ending from './ending';
import Marker from './marker.enum';

export class State {
    state: State;
    cells: Array<Cell> = [];
    turn: Marker = Marker.X;
    ending: Ending;

    constructor () {
        for ( let i = 0; i <= 8; i++ ) {
            this.cells.push( new Cell( i ) );
        }
    }
    
    emptyCells() {
        const emptyCells = new Array<number>();

        if (this.cells) {
            this.cells.forEach((cell) => {
                if (!cell.getMarker()) {
                    emptyCells.push(cell.id);
                }
            });
        }
        return emptyCells;
    }
    
    toggleTurn() {
        this.turn = (this.turn === Marker.X) ? Marker.O : Marker.X;
    }
  }

export default State;