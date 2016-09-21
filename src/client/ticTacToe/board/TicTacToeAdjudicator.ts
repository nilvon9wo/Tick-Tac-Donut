import TicTacToeBoard from './TicTacToeBoard';
import TicTacToeJudge from './TicTacToeJudge';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToeStateStatus from '../TicTacToeStateStatus';

class TicTacToeAdjudicator {
    private board: TicTacToeBoard;
    private judge: TicTacToeJudge;
    private squares: Array<TicTacToeMarker>;

    constructor(board: TicTacToeBoard, judge?: TicTacToeJudge) {
        this.board = board;
        this.judge = judge || new TicTacToeJudge();
        this.squares = this.board.getSquares();
    }

    public checkDiagnals() {
        for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
            if (!this.squares[i]) {
                return TicTacToeStateStatus.STILL_RUNNING;
            }

            const owner = this.squares[i];
            const secondRequiredSquare = i + j;
            const thirdRequiredSquare = i + 2 * j;
            if (
                owner === this.squares[secondRequiredSquare] &&
                owner === this.squares[thirdRequiredSquare]
            ) {
                this.judge.markWinner([i, secondRequiredSquare, thirdRequiredSquare]);
                return this.judge.selectWinner(owner);
            }
        }
        return TicTacToeStateStatus.STILL_RUNNING;
    }

    public checkColumns() {
        return this.check({
            additionalSquaresRequired: [3, 6],
            squareIncrement: 1,
            squaresUntil: 2
        });
    }

    public checkRows() {
        return this.check({
            additionalSquaresRequired: [1, 2],
            squareIncrement: 3,
            squaresUntil: 6
        });
    }

    public check(config: any) {
        for (let i = 0; i <= config.squaresUntil; i = i + config.squareIncrement) {
            if (!this.squares[i]) {
                return TicTacToeStateStatus.STILL_RUNNING;
            }

            const owner = this.squares[i];
            const secondRequiredSquare = i + config.additionalSquaresRequired[0];
            const thirdRequiredSquare = i + config.additionalSquaresRequired[1];
            if (
                owner === this.squares[secondRequiredSquare] &&
                owner === this.squares[thirdRequiredSquare]
            ) {
                this.judge.markWinner([i, secondRequiredSquare, thirdRequiredSquare]);
                return this.judge.selectWinner(owner);
            }
        }
        return TicTacToeStateStatus.STILL_RUNNING;
    }

    public isDraw(): TicTacToeStateStatus {
        const available = this.board.emptyCells();
        if (available.length === 0) {
            return TicTacToeStateStatus.DRAW;
        } else {
            return TicTacToeStateStatus.STILL_RUNNING;
        }
    }
}

export default TicTacToeAdjudicator;
