import AbstractTicTacToeComputerPlayer from './AbstractTicTacToeComputerPlayer';
import TicTacToeState from '../TicTacToeState';

class TicTacToeImpossibleComputerPlayer extends AbstractTicTacToeComputerPlayer {

    public takeTurn(state: TicTacToeState) {
        state.toggleTurn();
        const availableActions = this.actionCalculator.sortedAvailableActions(state, this.game);

        const chosenAction = availableActions[0];

        this.game.state.board.insertAt(chosenAction.movePosition, state.turn);
        const nextState = chosenAction.applyTo(state);
        this.game.advanceTo(nextState);
    }
}

export default TicTacToeImpossibleComputerPlayer;

