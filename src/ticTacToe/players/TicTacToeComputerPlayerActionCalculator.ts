import TicTacToeComputerPlayerAction from './TicTacToeComputerPlayerAction';
import TicTacToeComputerPlayerActionComparitor from './TicTacToeComputerPlayerActionComparitor';
import TicTacToeGame from '../game/TicTacToeGame';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToeState from '../TicTacToeState';

class TicTacToeComputerPlayerActionCalculator {

    private actionComparitor: TicTacToeComputerPlayerActionComparitor;

    constructor(actionComparitor?: TicTacToeComputerPlayerActionComparitor) {
        this.actionComparitor = actionComparitor || new TicTacToeComputerPlayerActionComparitor();
    };

    public miniMaxValue(state: TicTacToeState, game: TicTacToeGame) {
        if (state.isTerminal()) {
            return game.score(state);
        }

        let stateScore = (state.turn === TicTacToeMarker.X) ? -1000 : 1000;

        const availablePositions = state.emptyCells();
        const availableNextStates = availablePositions.map((position) => {
            const action = new TicTacToeComputerPlayerAction(position);
            return action.applyTo(state);
        });

        availableNextStates.forEach((nextState) => {
            const nextScore = this.miniMaxValue(nextState, game);
            if (state.turn === TicTacToeMarker.X) {
                if (nextScore > stateScore) {
                    stateScore = nextScore;
                }
            } else if (nextScore < stateScore) {
                stateScore = nextScore;
            }
        });

        return stateScore;
    };

    public sortedAvailableActions(state: TicTacToeState, game: TicTacToeGame) {
        const available = state.emptyCells();
        const availableActions = available.map((position) => {
            const action = new TicTacToeComputerPlayerAction(position);
            const nextAction = action.applyTo(state);
            action.miniMaxValue = this.miniMaxValue(nextAction, game);
            return action;
        });

        if (state.turn === TicTacToeMarker.X) {
            availableActions.sort(this.actionComparitor.DESCENDING);
        } else {
            availableActions.sort(this.actionComparitor.ASCENDING);
        }
        return availableActions;
    }
}

export default TicTacToeComputerPlayerActionCalculator;
