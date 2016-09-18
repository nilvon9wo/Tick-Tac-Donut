import TicTacToeMarker from '../Markers/TicTacToeMarker';
import TicTacToeState from '../TicTacToeState';

class TicTacToeComputerPlayerAction {
    public miniMaxValue: number;
    private movePosition: number;

    constructor(position: number) {
        this.movePosition = position;
        this.miniMaxValue = 0;
    }

    public applyTo(state: TicTacToeState) {
        const nextState = new TicTacToeState(state);
        const nextBoard = nextState.board;
        nextBoard.set(this.movePosition, state.turn);

        if (state.turn === TicTacToeMarker.O) {
            nextState.oMoveCount++;
        }

        nextState.advanceTurn();

        return nextState;
    }
}

export default TicTacToeComputerPlayerAction;
