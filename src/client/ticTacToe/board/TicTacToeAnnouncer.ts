class TicTacToeAnnouncer {
    public markWinner( winningSquares: Array<number> ) {
        const board = $( '.ticTacToe--board-cell--background' );
        winningSquares.forEach(( index ) => {
            const targetSquare = $( board[ index ] );
            targetSquare.removeClass( 'ticTacToe--board-cell--background' );
            targetSquare.addClass( 'ticTacToe--board-cell--win' );
        });
    }
}

export default TicTacToeAnnouncer;