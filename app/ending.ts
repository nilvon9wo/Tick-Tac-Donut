import  Marker  from './marker.enum';

class Ending {
    winner: Marker;
    line: Array<number>;

    constructor(winner: Marker, line: Array<number>) {
        this.winner = winner;
        this.line = line;
    }

    public hasWinner() {
        return this.winner !== null;
    }
}

export default Ending;
