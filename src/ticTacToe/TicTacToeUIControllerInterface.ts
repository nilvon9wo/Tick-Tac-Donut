import PlayerType from '../common/PlayerType';
import TicTacToeMarker from './Markers/TicTacToeMarker';
import TicTacToeComputerPlayerHelper from './Players/TicTacToeComputerPlayerHelper';

interface TicTacToeUIControllerInterface extends ng.IScope {
    computerPlayerHelper?: TicTacToeComputerPlayerHelper;
    insertAt: (index: number, symbol: TicTacToeMarker) => void;
    refresh: () => void;
    selectLevel: () => void;
    start: () => void;
    switchViewTo: (turn: PlayerType) => void;
}

export default TicTacToeUIControllerInterface;
