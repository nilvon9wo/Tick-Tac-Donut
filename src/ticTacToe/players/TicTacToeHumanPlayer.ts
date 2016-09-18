import PlayerType from '../../common/PlayerType';
import TicTacToePlayerInterface from './TicTacToePlayerInterface';

class TicTacToeHumanPlayer implements TicTacToePlayerInterface {
    public playerType = PlayerType.HUMAN;
}

export default TicTacToeHumanPlayer;
