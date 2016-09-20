import TicTacToeBoard from './board/TicTacToeBoard';
import TicTacToeMarker from './markers/TicTacToeMarker';
import TicTacToeStateStatus from './TicTacToeStateStatus';

class TicTacToeState {
    public board: TicTacToeBoard;
    public oMoveCount: number = 0;
    public emptyCells: () => Array<number>;
    public result: TicTacToeStateStatus;
    public turn: TicTacToeMarker;

    constructor(oldState?: TicTacToeState) {
        this.board = oldState && oldState.board || new TicTacToeBoard();
        this.emptyCells = this.board.emptyCells;
        this.oMoveCount = 0;
        this.result = oldState && oldState.result || TicTacToeStateStatus.STILL_RUNNING;
        this.turn = oldState && oldState.turn;
    }

    public toggleTurn() {
        this.turn = (this.turn === TicTacToeMarker.X) ?
            TicTacToeMarker.O :
            TicTacToeMarker.X;
    }

    public isTerminal(): boolean {
        this.result = this.board.status();
        return this.result !== TicTacToeStateStatus.STILL_RUNNING;
    }
}

export default TicTacToeState;
