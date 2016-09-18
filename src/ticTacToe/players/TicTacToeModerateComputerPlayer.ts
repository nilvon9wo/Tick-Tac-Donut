import AbstractTicTacToeComputerPlayer from './AbstractTicTacToeComputerPlayer';
import TicTacToeState from '../TicTacToeState';

class TicTacToeModerateComputerPlayer extends AbstractTicTacToeComputerPlayer {
    private MAX_SKILL = 100;
    private PLAYER_SKILL = 50;

    public takeTurn(state: TicTacToeState) {
        state.toggleTurn();
        const availableActions = this.actionCalculator.sortedAvailableActions(state, this.game);

        const isActingSmart = Math.random() * this.MAX_SKILL <= this.PLAYER_SKILL;
        const hasNoChoices = availableActions.length < 2;
        const choice = (isActingSmart || hasNoChoices) ? 0 : 1;
        const chosenAction = availableActions[choice];

        this.game.state.board.insertAt(chosenAction.movePosition, state.turn);
        const nextState = chosenAction.applyTo(state);
        this.game.advanceTo(nextState);
    }
}

export default TicTacToeModerateComputerPlayer;
