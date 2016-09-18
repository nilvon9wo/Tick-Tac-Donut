import AbstractTicTacToeComputerPlayer from './AbstractTicTacToeComputerPlayer';
import TicTacToeMarker from '../Markers/TicTacToeMarker';

class TicTacToeImpossibleComputerPlayer extends AbstractTicTacToeComputerPlayer {
    public takeTurn(marker: TicTacToeMarker) {
        console.log('Taking turn...', marker);
    }
}

export default TicTacToeImpossibleComputerPlayer;
