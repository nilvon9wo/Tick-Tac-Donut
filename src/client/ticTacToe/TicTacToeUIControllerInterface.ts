import TicTacToeHumanPlayer from './players/TicTacToeHumanPlayer';
import TicTacToeComputerPlayerSelector from './players/TicTacToeComputerPlayerSelector';

interface TicTacToeUIControllerInterface extends ng.IScope {
    computerPlayerSelector?: TicTacToeComputerPlayerSelector;
    human?: TicTacToeHumanPlayer;
    refresh: () => void;
    selectLevel: () => void;
    start: () => void;
}

export default TicTacToeUIControllerInterface;
