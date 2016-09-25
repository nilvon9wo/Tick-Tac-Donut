import Cell from './cell';
import Marker from './marker.enum';

export class State {
    computer = Marker.O;
    human = Marker.X;
    state: State;
    cells: Array<Cell> = [];
    turn: Marker = Marker.X;
    winner: Marker;

    constructor () {
        for ( let i = 0; i <= 8; i++ ) {
            this.cells.push( new Cell( i ) );
        }
    }

    emptyCells() {
        const emptyCells = new Array<Cell>();

        this.cells.forEach((cell) => {
            if (cell.isEmpty()) {
                emptyCells.push(cell);
            }
        });

        return emptyCells;
    }

    setWinner(winner: Marker) {
        this.winner = winner;
        delete this.turn;
    }

    toggleTurn() {
        this.turn = (this.turn === Marker.X) ? Marker.O : Marker.X;
    }
  }

export default State;
