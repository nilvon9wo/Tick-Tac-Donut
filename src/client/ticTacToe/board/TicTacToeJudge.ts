import TicTacToeAnnouncer from './TicTacToeAnnouncer';
import TicTacToeBadPlayerError from '../players/TicTacToeBadPlayerError';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToeStateStatus from '../TicTacToeStateStatus';

class TicTacToeJudge {
    private announcer: TicTacToeAnnouncer;

    constructor(announcer?: TicTacToeAnnouncer) {
        this.announcer = announcer || new TicTacToeAnnouncer();
    }

    public consult(squares: Array<TicTacToeMarker>, positions: Array<number>) {
        const firstSqure = positions[0];
        const secondRequiredSquare = positions[1];
        const thirdRequiredSquare = positions[2];
        const owner = squares[firstSqure];
        if (
                owner === squares[secondRequiredSquare] &&
                owner === squares[thirdRequiredSquare]
            ) {
                this.announcer.markWinner([firstSqure, secondRequiredSquare, thirdRequiredSquare]);
                return this.selectWinner(owner);
            }

        return TicTacToeStateStatus.STILL_RUNNING;
    }

    private selectWinner(marker: TicTacToeMarker): TicTacToeStateStatus {
        switch (marker) {
            case (TicTacToeMarker.O): return TicTacToeStateStatus.O_WON;
            case (TicTacToeMarker.X): return TicTacToeStateStatus.X_WON;
        }

        throw new TicTacToeBadPlayerError('Invalid player: ' + marker);
    }
}

export default TicTacToeJudge;
