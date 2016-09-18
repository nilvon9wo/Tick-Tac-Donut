import AbstractTicTacToeComputerPlayer from './AbstractTicTacToeComputerPlayer';
import TicTacToeMarker from '../Markers/TicTacToeMarker';
import TicTacToeState from '../TicTacToeState';
import TicTacToeComputerPlayerAction from './TicTacToeComputerPlayerAction';

class TicTacToeImpossibleComputerPlayer extends AbstractTicTacToeComputerPlayer {
    
    public takeTurn(state: TicTacToeState) {
        const availableActions = this.actionCalculator.sortedAvailableActions(state, this.game);
        
        const chosenAction = availableActions[0];

        this.game.state.board.insertAt(chosenAction.movePosition, state.turn);
        const nextState = chosenAction.applyTo(state);
        this.game.advanceTo(nextState);
    }
}

export default TicTacToeImpossibleComputerPlayer;

