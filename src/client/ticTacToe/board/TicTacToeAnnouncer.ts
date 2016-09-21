class TicTacToeAnnouncer {
    public markWinner( winningCells: Array<number> ) {
        const board = $( '.ticTacToe--board-cell--background' );
        winningCells.forEach(( index ) => {
            const targetCell = $( board[ index ] );
            targetCell.removeClass( 'ticTacToe--board-cell--background' );
            targetCell.addClass( 'ticTacToe--board-cell--win' );
        });
    }
}

export default TicTacToeAnnouncer;
