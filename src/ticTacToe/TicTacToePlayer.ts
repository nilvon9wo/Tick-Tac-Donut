import PlayerType from '../common/PlayerType';
import TicTacToeMarker from './TicTacToeMarker';

interface TicTacToePlayer {
    type: PlayerType;
    marker: TicTacToeMarker;
}

export default TicTacToePlayer;
