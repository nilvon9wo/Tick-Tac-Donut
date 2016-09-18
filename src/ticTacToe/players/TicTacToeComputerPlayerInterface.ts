import TicTacToeGame from '../game/TicTacToeGame';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToePlayerInterface from './TicTacToePlayerInterface';
import TicTacToeState from '../TicTacToeState';

interface TicTacToeComputerPlayerInterface extends TicTacToePlayerInterface {
    plays: (game: TicTacToeGame) => void;
    startFlicker: () => void;
    stopFlicker: () => void;
    takeTurn: (state: TicTacToeState) => void;
}

export default TicTacToeComputerPlayerInterface;
