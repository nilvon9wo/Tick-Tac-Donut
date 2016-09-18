import AbstractTicTacToeComputerPlayer from './AbstractTicTacToeComputerPlayer';
import TicTacToeMarker from '../Markers/TicTacToeMarker';
import TicTacToeState from '../TicTacToeState';
import TicTacToeComputerPlayerAction from './TicTacToeComputerPlayerAction';
import TicTacToeComputerPlayerActionComparitor from './TicTacToeComputerPlayerActionComparitor';


class TicTacToeEasyComputerPlayer extends AbstractTicTacToeComputerPlayer {

    public takeTurn(state: TicTacToeState) {
        const available = state.emptyCells();
        const randomCell = available[Math.floor(Math.random() * available.length)]; 
        
        const chosenAction = new TicTacToeComputerPlayerAction(randomCell);
        
        this.game.state.board.insertAt(chosenAction.movePosition, state.turn);
        const nextState = chosenAction.applyTo(state);
        this.game.advanceTo(nextState);
    }
}

export default TicTacToeEasyComputerPlayer;
