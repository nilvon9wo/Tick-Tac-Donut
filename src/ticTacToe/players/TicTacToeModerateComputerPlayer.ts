import AbstractTicTacToeComputerPlayer from './AbstractTicTacToeComputerPlayer';
import TicTacToeComputerPlayerAction from './TicTacToeComputerPlayerAction';
import TicTacToeState from '../TicTacToeState';

class TicTacToeModerateComputerPlayer extends AbstractTicTacToeComputerPlayer {
    private MAX_SKILL = 100;
    private PLAYER_SKILL = 50;

    public chooseAction(state: TicTacToeState): TicTacToeComputerPlayerAction {
        const availableActions = this.actionCalculator.sortedAvailableActions(state, this.game);
        const isActingSmart = Math.random() * this.MAX_SKILL <= this.PLAYER_SKILL;
        const hasNoChoices = availableActions.length < 2;
        const choice = (isActingSmart || hasNoChoices) ? 0 : 1;
        return availableActions[choice];
    }
}

export default TicTacToeModerateComputerPlayer;
