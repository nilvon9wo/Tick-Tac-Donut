import TicTacToeBoard from './TicTacToeBoard';
import TicTacToeMarker from './TicTacToeMarker';
import TicTacToeStatus from './TicTacToeStatus';

class TicTacToeState {
    public board: TicTacToeBoard;

    private turn: TicTacToeMarker;
    private oMoveCount: number = 0;
    private result: TicTacToeStatus;

    constructor(oldState?: TicTacToeState) {
        this.turn = null;
        this.oMoveCount = 0;
        this.result = TicTacToeStatus.STILL_RUNNING;
        this.board = new TicTacToeBoard;

        if (oldState) {
            this.copyFromOldState(oldState);
        }
    }

    public advanceTurn() {
        this.turn = (this.turn === TicTacToeMarker.X) ?
            TicTacToeMarker.O :
            TicTacToeMarker.X;
    }

    public isTerminal(): boolean {
        this.result = this.board.status();
        return this.result !== TicTacToeStatus.STILL_RUNNING;
    }

    private copyFromOldState(oldState: TicTacToeState) {
            this.board = oldState.board.clone();
            this.result = oldState.result;
            this.turn = oldState.turn;
    }
}

export default TicTacToeState;
