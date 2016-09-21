import TicTacToeBadPlayerError from '../players/TicTacToeBadPlayerError';
import TicTacToeBoard from './TicTacToeBoard';
import TicTacToeAnnouncer from './TicTacToeAnnouncer';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToeStateStatus from '../TicTacToeStateStatus';

class TicTacToeAdjudicator {
    private board: TicTacToeBoard;
    private announcer: TicTacToeAnnouncer;
    private cells: Array<TicTacToeMarker>;

    constructor(board: TicTacToeBoard, announcer?: TicTacToeAnnouncer) {
        this.board = board;
        this.announcer = announcer || new TicTacToeAnnouncer();
        this.cells = this.board.getCells();
    }

    public checkColumns() {
        return this.checkEdgeAdjacent({
            additionalCellsRequired: [3, 6],
            cellIncrement: 1,
            cellsUntil: 2
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

    public checkRows() {
        return this.checkEdgeAdjacent({
            additionalCellsRequired: [1, 2],
            cellIncrement: 3,
            cellsUntil: 6
        });
    }

    public isDraw(): TicTacToeStateStatus {
        const available = this.board.emptyCells();
        if (available.length === 0) {
            return TicTacToeStateStatus.DRAW;
        } else {
            return TicTacToeStateStatus.STILL_RUNNING;
        }
    }

    private check(line: Array<number>) {
        let i = line[0];
        if (!this.cells[i]) {
            return TicTacToeStateStatus.STILL_RUNNING;
        }
        return this.decide(this.cells, line);
    }

    public decide (cells: Array<TicTacToeMarker>, positions: Array<number>) {
        console.log('$$$ decide', cells, positions);
        const firstCell = positions[0];
        const secondCell = positions[1];
        const thirdCell = positions[2];
        const owner = cells[firstCell];
        if (
                owner === cells[secondCell] &&
                owner === cells[thirdCell]
            ) {
                this.announcer.markWinner(positions);
                console.log('$$$ decide owner', owner);
                return this.selectWinner(owner);
            }

        return TicTacToeStateStatus.STILL_RUNNING;
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

    private selectWinner(marker: TicTacToeMarker): TicTacToeStateStatus {
        console.log('$$$ selectWinner marker', marker);
        
        switch (marker) {
            case (TicTacToeMarker.O): console.log('$$$ Winner O'); return TicTacToeStateStatus.O_WON;
            case (TicTacToeMarker.X): console.log('$$$ Winner X'); return TicTacToeStateStatus.X_WON;
        }

        throw new TicTacToeBadPlayerError('Invalid player: ' + marker);
    }
}

export default TicTacToeAdjudicator;
