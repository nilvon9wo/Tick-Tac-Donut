import PlayerType from '../../common/PlayerType';
import TicTacToeGame from '../game/TicTacToeGame';
import TicTacToeComputerPlayerActionCalculator from './TicTacToeComputerPlayerActionCalculator';
import TicTacToeComputerPlayerInterface from './TicTacToeComputerPlayerInterface';
import TicTacToeState from '../TicTacToeState';

abstract class AbstractTicTacToeComputerPlayer implements TicTacToeComputerPlayerInterface {
    public playerType = PlayerType.HUMAN;
    protected actionCalculator: TicTacToeComputerPlayerActionCalculator;
    protected game: TicTacToeGame;
    private aiFlickerHandle: any;

    constructor(actionCalculator?: TicTacToeComputerPlayerActionCalculator) {
        this.actionCalculator = actionCalculator || new TicTacToeComputerPlayerActionCalculator();
        this.aiFlickerHandle = 0;
    };

    public abstract takeTurn(state: TicTacToeState): void;

    public plays(game: TicTacToeGame) {
        this.game = game;
    };

    public startFlicker() {
        this.aiFlickerHandle = setInterval(function() {
            $('#computer-eye').toggleClass('ticTacToe--ingame--computer-image');
        }, 500);
    };

    public stopFlicker() {
        clearInterval(this.aiFlickerHandle);
    };
}

export default AbstractTicTacToeComputerPlayer;
