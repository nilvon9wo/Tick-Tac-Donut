import PlayerType from '../../common/PlayerType';
import TicTacToeGame from '../game/TicTacToeGame';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToeComputerPlayerAction from './TicTacToeComputerPlayerAction';
import TicTacToeComputerPlayerInterface from './TicTacToeComputerPlayerInterface';
import TicTacToeState from '../TicTacToeState';

abstract class AbstractTicTacToeComputerPlayer implements TicTacToeComputerPlayerInterface {
    public playerType = PlayerType.HUMAN;
    private aiFlickerHandle: any;
    private game: TicTacToeGame;

    constructor() {
        this.aiFlickerHandle = 0;
    };

    public abstract takeTurn(marker: TicTacToeMarker): void;

    public miniMaxValue(state: TicTacToeState) {
        if (state.isTerminal()) {
            return this.game.score(state);
        }

        let stateScore = (state.turn === TicTacToeMarker.X) ? -1000 : 1000;

        const availablePositions = state.emptyCells();
        const availableNextStates = availablePositions.map((position) => {
            const action = new TicTacToeComputerPlayerAction(position);
            return action.applyTo(state);
        });

        availableNextStates.forEach((nextState) => {
            const nextScore = this.miniMaxValue(nextState);
            if (state.turn === TicTacToeMarker.X) {
                if (nextScore > stateScore) {
                    stateScore = nextScore;
                }
            } else if (nextScore < stateScore) {
                stateScore = nextScore;
            }
        });

        return stateScore;
    };

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
