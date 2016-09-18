import TicTacToeGame from '../game/TicTacToeGame';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToePlayerInterface from './TicTacToePlayerInterface';
import TicTacToeState from '../TicTacToeState';

interface TicTacToeComputerPlayerInterface extends TicTacToePlayerInterface {
    miniMaxValue: (state: TicTacToeState) => void;
    plays: (game: TicTacToeGame) => void;
    startFlicker: () => void;
    stopFlicker: () => void;
    takeTurn: (marker: TicTacToeMarker) => void;
}

export default TicTacToeComputerPlayerInterface;
