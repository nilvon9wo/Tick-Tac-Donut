import TicTacToeBoard from './TicTacToeBoard';
import TicTacToeJudge from './TicTacToeJudge';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToeStateStatus from '../TicTacToeStateStatus';

class TicTacToeAdjudicator {
    private board: TicTacToeBoard;
    private judge: TicTacToeJudge;
    private cells: Array<TicTacToeMarker>;

    constructor(board: TicTacToeBoard, judge?: TicTacToeJudge) {
        this.board = board;
        this.judge = judge || new TicTacToeJudge();
        this.cells = this.board.getCells();
    }

    public checkColumns() {
        return this.checkEdgeAdjacent({
            additionalCellsRequired: [3, 6],
            cellIncrement: 1,
            cellsUntil: 2
        });
    }

    public checkRows() {
        return this.checkEdgeAdjacent({
            additionalCellsRequired: [1, 2],
            cellIncrement: 3,
            cellsUntil: 6
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
        for (let i = 0; i <= config.cellsUntil; i = i + config.cellIncrement) {
            const line = [i, i + config.additionalCellsRequired[0], i + config.additionalCellsRequired[1]];
            const result = this.check(line);
            if (result !== TicTacToeStateStatus.STILL_RUNNING) {
                return result;
            }
        }
        return TicTacToeStateStatus.STILL_RUNNING;
    }

    private check(line: Array<number>) {
            let i = line[0];
            if (!this.cells[i]) {
                return TicTacToeStateStatus.STILL_RUNNING;
            }
            return this.judge.consult(this.cells, line);
    }
}

export default TicTacToeAdjudicator;
