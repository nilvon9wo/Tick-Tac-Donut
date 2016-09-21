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

    public checkColumns() {
        return this.checkEdgeAdjacent({
            additionalSquaresRequired: [3, 6],
            squareIncrement: 1,
            squaresUntil: 2
        });
    }

    public checkRows() {
        return this.checkEdgeAdjacent({
            additionalSquaresRequired: [1, 2],
            squareIncrement: 3,
            squaresUntil: 6
        });
    }

    public checkDiagnals() {
        for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
            const line = [i, i + j, i + 2 * j];
            const result = this.check(line);
            if (result !== TicTacToeStateStatus.STILL_RUNNING) {
                return result;
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

    private checkEdgeAdjacent(config: any) {
        for (let i = 0; i <= config.squaresUntil; i = i + config.squareIncrement) {
            const line = [i, i + config.additionalSquaresRequired[0], i + config.additionalSquaresRequired[1]];
            const result = this.check(line);
            if (result !== TicTacToeStateStatus.STILL_RUNNING) {
                return result;
            }
        }
        return TicTacToeStateStatus.STILL_RUNNING;
    }

    private check(line: Array<number>) {
            let i = line[0];
            if (!this.squares[i]) {
                return TicTacToeStateStatus.STILL_RUNNING;
            }
            return this.judge.consult(this.squares, line);
    }
}

export default TicTacToeAdjudicator;
