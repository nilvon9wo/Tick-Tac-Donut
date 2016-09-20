import AbstractTicTacToeComputerPlayer from './AbstractTicTacToeComputerPlayer';
import TicTacToeState from '../TicTacToeState';
import TicTacToeComputerPlayerAction from './TicTacToeComputerPlayerAction';

class TicTacToeEasyComputerPlayer extends AbstractTicTacToeComputerPlayer {

    public chooseAction(state: TicTacToeState): TicTacToeComputerPlayerAction {
        const availableCells = state.board.emptyCells();
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        return new TicTacToeComputerPlayerAction(randomCell);
    }

}

export default TicTacToeEasyComputerPlayer;
