import Cell from '../cells/cell';
import Marker from './marker.enum';

export class State {
    public computer = Marker.O;
    public human = Marker.X;
    public state: State;
    public cells: Array<Cell> = [];
    public turn: Marker = Marker.X;
    public winner: Marker;

    constructor() {
        for ( let i = 0; i <= 8; i++ ) {
            this.cells.push( new Cell( i ) );
        }
    }

    public emptyCells() {
        const emptyCells = new Array<Cell>();

        this.cells.forEach(( cell ) => {
            if ( cell.isEmpty() ) {
                emptyCells.push( cell );
            }
        });

        return emptyCells;
    }

    public reset(){
        this.clearMarkers();
        this.turn = Marker.X;
        this.winner = undefined;
    }

    public setWinner( winner: Marker ) {
        this.winner = winner;
        delete this.turn;
    }

    public toggleTurn() {
        this.turn = ( this.turn === Marker.X ) ? Marker.O : Marker.X;
    }

    private clearMarkers() {
        this.cells.forEach(cell => {
            cell.resetMarker();
        });
    }
}

export default State;
