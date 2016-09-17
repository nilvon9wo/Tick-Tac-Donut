import TicTacToeBadLocationError from './TicTacToeBadLocationError';
import TicTacToeBadPlayerError from './TicTacToeBadPlayerError';
import TicTacToeMarker from './TicTacToeMarker';
import TicTacToePlayer from './TicTacToePlayer';
import TicTacToeStatus from './TicTacToeStatus';

class TicTacToeBoard {
    private squares: Array<TicTacToePlayer>;

    constructor() {
        this.squares = new Array<TicTacToePlayer>();
    }

    public set(location: number, player: TicTacToePlayer) {
        if (location < 0 || location > 8) {
            throw new TicTacToeBadLocationError('Invalid y coordinate: ' + location);
        }

        this.squares[location] = player;
    }

    public clone() {
        const newBoard = new TicTacToeBoard();
        this.squares.forEach(function(player: TicTacToePlayer, index: number) {
            newBoard.squares[index] = player;
        });
        return newBoard;
    }

    public emptyCells() {
        const emptyCells = new Array<number>();
        this.squares.forEach(function(player: TicTacToePlayer, index: number) {
            if (!player) {
                emptyCells.push(index);
            }
        });
        return emptyCells;
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
            squaresUntil: 2,
            squareIncrement: 1,
            additionalSquaresRequired: [3, 6]
        });
    }

    private checkRows(): TicTacToeStatus {
        return this.check({
            squaresUntil: 6,
            squareIncrement: 3,
            additionalSquaresRequired: [1, 2]
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

    private selectWinner(rowOwner: TicTacToePlayer): TicTacToeStatus {
        switch (rowOwner.marker) {
            case (TicTacToeMarker.O): return TicTacToeStatus.O_WON;
            case (TicTacToeMarker.X): return TicTacToeStatus.X_WON;
        }

        throw new TicTacToeBadPlayerError('Invalid player: ' + rowOwner.marker);
    }

    private isDraw(): TicTacToeStatus {
        const available = this.emptyCells();
        if (available.length === 0) {
            return TicTacToeStatus.DRAW;
        } else {
            return TicTacToeStatus.STILL_RUNNING;
        }
    }
}

export default TicTacToeBoard;
