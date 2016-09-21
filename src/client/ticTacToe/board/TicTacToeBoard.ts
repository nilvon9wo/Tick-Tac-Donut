import TicTacToeBadLocationError from './TicTacToeBadLocationError';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToeAdjudicator from './TicTacToeAdjudicator';
import TicTacToeStateStatus from '../TicTacToeStateStatus';

class TicTacToeBoard {
    private cells: Array<TicTacToeMarker>;
    private adjudicator: TicTacToeAdjudicator;

    constructor(adjudicator?: TicTacToeAdjudicator) {
        this.cells = new Array<TicTacToeMarker>();
        this.adjudicator = adjudicator || new TicTacToeAdjudicator(this);
    }

    public clone() {
        const newBoard = new TicTacToeBoard();
        this.cells.forEach(function(marker: TicTacToeMarker, index: number) {
            newBoard.cells[index] = marker;
        });
        return newBoard;
    }

    public emptyCells() {
        const emptyCells = new Array<number>();

        if (this.cells) {
            this.cells.forEach(function(marker: TicTacToeMarker, index: number) {
                if (!marker) {
                    emptyCells.push(index);
                }
            });
        }
        return emptyCells;
    }

    public getCells() {
        return this.cells;
    }

    public insertAt(index: number, marker: TicTacToeMarker) {
        const board = $('.ticTacToe--board-cell--background');
        const targetCell = $(board[index]);

        if (targetCell.hasClass('ticTacToe--board-cell--empty')) {
            targetCell.removeClass('ticTacToe--board-cell--empty');
            const symbol = TicTacToeMarker[marker].toLowerCase();
            const newMarker = $('<div/>', {
                class: 'ticTacToe--board-cell--' + symbol,
                text: symbol
            });
            newMarker.appendTo(targetCell);
        }
    }

    public set(location: number, marker: TicTacToeMarker) {
        if (location < 0 || location > 8) {
            throw new TicTacToeBadLocationError('Invalid y coordinate: ' + location);
        }

        this.cells[location] = marker;
    }

    public reset() {
        for (let i = 0; i <= 8; i++) {
            this.set(i, null);
        }
    }

    public status(): TicTacToeStateStatus {
        const rowsStatus = this.adjudicator.checkRows();
        if (rowsStatus !== TicTacToeStateStatus.STILL_RUNNING) {
            return rowsStatus;
        }

        const columnStatus = this.adjudicator.checkColumns();
        if (columnStatus !== TicTacToeStateStatus.STILL_RUNNING) {
            return columnStatus;
        }

        const diagnalStatus = this.adjudicator.checkDiagnals();
        if (diagnalStatus !== TicTacToeStateStatus.STILL_RUNNING) {
            return diagnalStatus;
        }

        return this.adjudicator.isDraw();
    }
}

export default TicTacToeBoard;
