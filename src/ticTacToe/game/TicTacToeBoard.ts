import TicTacToeBadLocationError from './TicTacToeBadLocationError';
import TicTacToeBadPlayerError from '../players/TicTacToeBadPlayerError';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToeStateStatus from '../TicTacToeStateStatus';

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

    public emptyCells() {
        const emptyCells = new Array<number>();
        this.squares.forEach(function(marker: TicTacToeMarker, index: number) {
            if (!marker) {
                emptyCells.push(index);
            }
        });
        return emptyCells;
    }

    public insertAt(index: number, marker: TicTacToeMarker) {
        console.log('insertAt', index, marker);
        const board = $('.ticTacToe--board-cell--background');
        console.log('length', board.length);
        const targetCell = $(board[index]);

        if (targetCell.hasClass('ticTacToe--board-cell--empty')) {
            targetCell.removeClass('ticTacToe--board-cell--empty');
            const symbol = TicTacToeMarker[marker].toLowerCase();
            console.log('inserting...', symbol);
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

        this.squares[location] = marker;
    }

    public reset() {
        for (let i = 0; i <= 8; i++) {
            this.set(i, null);
        }
    }

    public status(): TicTacToeStateStatus {
        const rowsStatus = this.checkRows();
        if (rowsStatus !== TicTacToeStateStatus.STILL_RUNNING) {
            return rowsStatus;
        }

        const columnStatus = this.checkColumns();
        if (columnStatus !== TicTacToeStateStatus.STILL_RUNNING) {
            return columnStatus;
        }

        const diagnalStatus = this.checkDiagnals();
        if (diagnalStatus !== TicTacToeStateStatus.STILL_RUNNING) {
            return diagnalStatus;
        }

        return this.isDraw();
    }

    private checkDiagnals(): TicTacToeStateStatus {
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
                this.markWinner([i, secondRequiredSquare, thirdRequiredSquare]);
                return this.selectWinner(owner);
            }
        }
        return TicTacToeStateStatus.STILL_RUNNING;
    }

    private checkColumns(): TicTacToeStateStatus {
        return this.check({
            additionalSquaresRequired: [3, 6],
            squareIncrement: 1,
            squaresUntil: 2
        });
    }

    private checkRows(): TicTacToeStateStatus {
        return this.check({
            additionalSquaresRequired: [1, 2],
            squareIncrement: 3,
            squaresUntil: 6
        });
    }

    private check(config: any): TicTacToeStateStatus {
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
                this.markWinner([i, secondRequiredSquare, thirdRequiredSquare]);
                return this.selectWinner(owner);
            }
        }
        return TicTacToeStateStatus.STILL_RUNNING;
    }

    private isDraw(): TicTacToeStateStatus {
        const available = this.emptyCells();
        if (available.length === 0) {
            return TicTacToeStateStatus.DRAW;
        } else {
            return TicTacToeStateStatus.STILL_RUNNING;
        }
    }

    private markWinner(winningSquares: Array<number>) {
        const board = $('.ticTacToe--board-cell--background');
        winningSquares.forEach((index) => {
            const targetSquare = $(board[index]);
            targetSquare.removeClass('ticTacToe--board-cell--background');
            targetSquare.addClass('ticTacToe--board-cell--win');
        });
    }

    private selectWinner(marker: TicTacToeMarker): TicTacToeStateStatus {
        switch (marker) {
            case (TicTacToeMarker.O): return TicTacToeStateStatus.O_WON;
            case (TicTacToeMarker.X): return TicTacToeStateStatus.X_WON;
        }

        throw new TicTacToeBadPlayerError('Invalid player: ' + marker);
    }

}

export default TicTacToeBoard;
