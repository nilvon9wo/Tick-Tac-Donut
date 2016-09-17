import PlayerType from '../common/PlayerType';
import TicTacToeMarker from './TicTacToeMarker';

interface TicTacToePlayer {
    playerType: PlayerType;
    marker: TicTacToeMarker;

    setMarker: (marker: TicTacToeMarker) => void;
}

export default TicTacToePlayer;
