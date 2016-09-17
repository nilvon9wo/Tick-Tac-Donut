import TicTacToeBadLocationError from './TicTacToeBadLocationError';
import TicTacToeBadPlayerError from './Players/TicTacToeBadPlayerError';
import TicTacToeMarker from './Markers/TicTacToeMarker';
import TicTacToeStatus from './TicTacToeStatus';

class TicTacToeBoard {
    private squares: Array<TicTacToeMarker>;

    constructor() {
        this.squares = new Array<TicTacToeMarker>();
    }

    public clone() {
        const newBoard = new TicTacToeBoard();
        this.squares.forEach(function(marker: TicTacToeMarker, index: number) {
            newBoard.squares[index] = marker;
        });
        return newBoard;
    }

    public insertAt(index: number, marker: TicTacToeMarker) {
        const board = $('.ticTacToe--board-cell');
        const targetCell = $(board[index]);

        if (targetCell.hasClass('ticTacToe--board-cell--empty')) {
            const symbol = marker.toString().toLowerCase();
            targetCell.html(symbol);
            targetCell.removeClass('ticTacToe--board-cell--empty');
            targetCell.addClass('ticTacToe--board-cell--' + symbol);
        }
    }

    public set(location: number, marker: TicTacToeMarker) {
        if (location < 0 || location > 8) {
            throw new TicTacToeBadLocationError('Invalid y coordinate: ' + location);
        }

        this.squares[location] = marker;
    }

    public status(): TicTacToeStatus {
        const rowsStatus = this.checkRows();
        if (rowsStatus !== TicTacToeStatus.STILL_RUNNING) {
            return rowsStatus;
        }

        const columnStatus = this.checkColumns();
        if (columnStatus !== TicTacToeStatus.STILL_RUNNING) {
            return columnStatus;
        }

        const diagnalStatus = this.checkDiagnals();
        if (diagnalStatus !== TicTacToeStatus.STILL_RUNNING) {
            return diagnalStatus;
        }

        return this.isDraw();
    }

    private checkDiagnals(): TicTacToeStatus {
        for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
            if (!this.squares[i]) {
                return TicTacToeStatus.STILL_RUNNING;
            }

            const owner = this.squares[i];
            if (
                owner === this.squares[i + j] &&
                owner === this.squares[i + 2 * j]
            ) {
                return this.selectWinner(owner);
            }
        }
        return TicTacToeStatus.STILL_RUNNING;
    }

    private checkColumns(): TicTacToeStatus {
        return this.check({
            additionalSquaresRequired: [3, 6],
            squareIncrement: 1,
            squaresUntil: 2
        });
    }

    private checkRows(): TicTacToeStatus {
        return this.check({
            additionalSquaresRequired: [1, 2],
            squareIncrement: 3,
            squaresUntil: 6
        });
    }

    private check(config: any): TicTacToeStatus {
        for (let i = 0; i <= config.squaresUntil; i = i + config.squareIncrement) {
            if (!this.squares[i]) {
                return TicTacToeStatus.STILL_RUNNING;
            }

            const owner = this.squares[i];
            if (
                owner === this.squares[i + config.additionalSquaresRequired[0]] &&
                owner === this.squares[i + config.additionalSquaresRequired[1]]
            ) {
                return this.selectWinner(owner);
            }
        }
        return TicTacToeStatus.STILL_RUNNING;
    }

    private emptyCells() {
        const emptyCells = new Array<number>();
        this.squares.forEach(function(marker: TicTacToeMarker, index: number) {
            if (!marker) {
                emptyCells.push(index);
            }
        });
        return emptyCells;
    }


    private isDraw(): TicTacToeStatus {
        const available = this.emptyCells();
        if (available.length === 0) {
            return TicTacToeStatus.DRAW;
        } else {
            return TicTacToeStatus.STILL_RUNNING;
        }
    }

    private selectWinner(marker: TicTacToeMarker): TicTacToeStatus {
        switch (marker) {
            case (TicTacToeMarker.O): return TicTacToeStatus.O_WON;
            case (TicTacToeMarker.X): return TicTacToeStatus.X_WON;
        }

        throw new TicTacToeBadPlayerError('Invalid player: ' + marker);
    }

}

export default TicTacToeBoard;
