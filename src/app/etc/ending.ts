import Marker  from './marker.enum';

class Ending {
    public winner: Marker;
    public line: Array<number>;

    constructor( winner: Marker, line: Array<number> ) {
        this.winner = winner;
        this.line = line;
    }

    public hasWinner() {
        return this.winner !== undefined;
    }
}

export default Ending;
