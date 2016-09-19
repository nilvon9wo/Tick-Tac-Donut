import AbstractTicTacToeComputerPlayer from './AbstractTicTacToeComputerPlayer';
import TicTacToeState from '../TicTacToeState';
import TicTacToeComputerPlayerAction from './TicTacToeComputerPlayerAction';

class TicTacToeEasyComputerPlayer extends AbstractTicTacToeComputerPlayer {

    protected chooseAction(availableCells: Array<number>): TicTacToeComputerPlayerAction {
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        return new TicTacToeComputerPlayerAction(randomCell);
    }

}

export default TicTacToeEasyComputerPlayer;
