import PlayerType from '../common/PlayerType';
import TicTacToeMarker from './TicTacToeMarker';

interface TicTacToeUIControllerInterface extends ng.IScope {
    computerMarker: TicTacToeMarker;
    humanMarker: TicTacToeMarker;
    insertAt: (index: number, symbol: TicTacToeMarker) => void;
    refresh: () => void;
    selectLevel: () => void;
    start: () => void;
    switchViewTo: (turn: PlayerType) => void;
}

export default TicTacToeUIControllerInterface;
