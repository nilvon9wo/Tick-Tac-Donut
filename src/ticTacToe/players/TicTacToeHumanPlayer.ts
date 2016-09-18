import PlayerType from '../../common/PlayerType';
import TicTacToeMarker from '../Markers/TicTacToeMarker';
import TicTacToePlayerInterface from './TicTacToePlayerInterface';

class TicTacToeHumanPlayer implements TicTacToePlayerInterface {
    public playerType = PlayerType.HUMAN;
    public marker: TicTacToeMarker;

    public setMarker(marker: TicTacToeMarker) {
        this.marker = marker;
    }
}

export default TicTacToeHumanPlayer;
