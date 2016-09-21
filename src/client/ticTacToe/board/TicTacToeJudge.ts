import TicTacToeBadPlayerError from '../players/TicTacToeBadPlayerError';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToeStateStatus from '../TicTacToeStateStatus';

class TicTacToeJudge {
    public markWinner(winningSquares: Array<number>) {
        const board = $('.ticTacToe--board-cell--background');
        winningSquares.forEach((index) => {
            const targetSquare = $(board[index]);
            targetSquare.removeClass('ticTacToe--board-cell--background');
            targetSquare.addClass('ticTacToe--board-cell--win');
        });
    }

    public selectWinner(marker: TicTacToeMarker): TicTacToeStateStatus {
        switch (marker) {
            case (TicTacToeMarker.O): return TicTacToeStateStatus.O_WON;
            case (TicTacToeMarker.X): return TicTacToeStateStatus.X_WON;
        }

        throw new TicTacToeBadPlayerError('Invalid player: ' + marker);
    }
}

export default TicTacToeJudge;
