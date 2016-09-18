import TicTacToeHumanPlayer from './players/TicTacToeHumanPlayer';
import TicTacToeMarker from './markers/TicTacToeMarker';
import TicTacToeComputerPlayerSelector from './players/TicTacToeComputerPlayerSelector';

interface TicTacToeUIControllerInterface extends ng.IScope {
    computerPlayerSelector?: TicTacToeComputerPlayerSelector;
    human?: TicTacToeHumanPlayer;
    insertAt: (index: number, symbol: TicTacToeMarker) => void;
    refresh: () => void;
    selectLevel: () => void;
    start: () => void;
}

export default TicTacToeUIControllerInterface;
