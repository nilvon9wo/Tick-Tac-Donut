import PlayerType from '../../common/PlayerType';
import TicTacToeGame from '../game/TicTacToeGame';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToeComputerPlayerInterface from './TicTacToeComputerPlayerInterface';
import TicTacToeState from '../TicTacToeState';

abstract class AbstractTicTacToeComputerPlayer implements TicTacToeComputerPlayerInterface {
    public playerType = PlayerType.HUMAN;
    public marker: TicTacToeMarker;
    private aiFlickerHandle: any;
    private game: TicTacToeGame;

    constructor() {
        this.aiFlickerHandle = 0;
    };

    public abstract takeTurn(marker: TicTacToeMarker): void;

    public miniMaxValue(state: TicTacToeState) {
        console.log('MiniMaxValue...', state);
    };

    public plays(game: TicTacToeGame) {
        this.game = game;
    };

    public setMarker(marker: TicTacToeMarker) {
        this.marker = marker;
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
