import AbstractTicTacToeComputerPlayer from './AbstractTicTacToeComputerPlayer';
import TicTacToeComputerPlayerAction from './TicTacToeComputerPlayerAction';
import TicTacToeState from '../TicTacToeState';

class TicTacToeImpossibleComputerPlayer extends AbstractTicTacToeComputerPlayer {

    public chooseAction(state: TicTacToeState): TicTacToeComputerPlayerAction {
        const availableActions = this.actionCalculator.sortedAvailableActions(state, this.game);
        return availableActions[0];
    }
}

export default TicTacToeImpossibleComputerPlayer;

