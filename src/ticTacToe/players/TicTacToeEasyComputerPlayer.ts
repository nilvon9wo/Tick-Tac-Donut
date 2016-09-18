import AbstractTicTacToeComputerPlayer from './AbstractTicTacToeComputerPlayer';
import TicTacToeState from '../TicTacToeState';
import TicTacToeComputerPlayerAction from './TicTacToeComputerPlayerAction';

class TicTacToeEasyComputerPlayer extends AbstractTicTacToeComputerPlayer {

    public takeTurn(state: TicTacToeState) {
        state.toggleTurn();
        const available = state.board.emptyCells();

        const randomCell = available[Math.floor(Math.random() * available.length)];
        const chosenAction = new TicTacToeComputerPlayerAction(randomCell);
        
        state.board.insertAt(chosenAction.movePosition, state.turn);
        console.log('INSERTED', chosenAction.movePosition, state.turn);
    }
}

export default TicTacToeEasyComputerPlayer;
