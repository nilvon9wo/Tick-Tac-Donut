import TicTacToeBoard from './game/TicTacToeBoard';
import TicTacToeMarker from './markers/TicTacToeMarker';
import TicTacToeStateStatus from './TicTacToeStateStatus';

class TicTacToeState {
    public board: TicTacToeBoard;
    public oMoveCount: number = 0;
    public emptyCells: () => Array<number>;
    public result: TicTacToeStateStatus;
    public turn: TicTacToeMarker;

    constructor(oldState?: TicTacToeState) {
        this.turn = null;
        this.oMoveCount = 0;
        this.result = TicTacToeStateStatus.STILL_RUNNING;
        this.board = new TicTacToeBoard();
        this.emptyCells = this.board.emptyCells;

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
        return this.result !== TicTacToeStateStatus.STILL_RUNNING;
    }

    private copyFromOldState(oldState: TicTacToeState) {
        this.board = oldState.board.clone();
        this.result = oldState.result;
        this.turn = oldState.turn;
    }
}

export default TicTacToeState;
