import PlayerType from '../common/PlayerType';
import TicTacToeMarker from './TicTacToeMarker';
import TicTacToePlayer from './TicTacToePlayer';

class TicTacToeHumanPlayer implements TicTacToePlayer {
    public playerType = PlayerType.HUMAN;
    public marker: TicTacToeMarker;

    public setMarker(marker: TicTacToeMarker) {
        this.marker = marker;
    }
}

export default TicTacToeHumanPlayer;
