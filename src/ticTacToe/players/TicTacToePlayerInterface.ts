import PlayerType from '../../common/PlayerType';
import TicTacToeMarker from '../Markers/TicTacToeMarker';

interface TicTacToePlayerInterface {
    playerType: PlayerType;
    marker: TicTacToeMarker;

    setMarker: (marker: TicTacToeMarker) => void;
}

export default TicTacToePlayerInterface;
