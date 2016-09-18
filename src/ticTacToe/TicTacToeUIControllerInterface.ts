import PlayerType from '../common/PlayerType';
import TicTacToeMarker from './Markers/TicTacToeMarker';
import TicTacToeComputerPlayerSelector from './Players/TicTacToeComputerPlayerSelector';

interface TicTacToeUIControllerInterface extends ng.IScope {
    computerPlayerHelper?: TicTacToeComputerPlayerSelector;
    insertAt: (index: number, symbol: TicTacToeMarker) => void;
    refresh: () => void;
    selectLevel: () => void;
    start: () => void;
    switchViewTo: (turn: PlayerType) => void;
}

export default TicTacToeUIControllerInterface;
