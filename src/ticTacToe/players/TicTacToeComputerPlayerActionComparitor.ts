import TicTacToeComputerPlayerAction from './TicTacToeComputerPlayerAction';

class TicTacToeComputerPlayerActionComparitor {
    public ASCENDING = function(firstAction: TicTacToeComputerPlayerAction, secondAction: TicTacToeComputerPlayerAction) {
        if (firstAction.miniMaxValue < secondAction.miniMaxValue) {
            return -1;
        } else if (firstAction.miniMaxValue > secondAction.miniMaxValue) {
            return 1;
        } else {
            return 0;
        }
    };

    public DESCENDING = function(firstAction: TicTacToeComputerPlayerAction, secondAction: TicTacToeComputerPlayerAction) {
        return !this.ASCENDING;
    };
}

export default TicTacToeComputerPlayerActionComparitor;
