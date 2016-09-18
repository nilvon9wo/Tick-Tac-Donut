import TicTacToeComputerPlayerInterface from '../players/TicTacToeComputerPlayerInterface';
import TicTacToeGameViewState from './TicTacToeGameViewState';

class TicTacToeGameView {
    public currentView: string;
    private computer: TicTacToeComputerPlayerInterface;
    private initialControlsVisible: boolean;

    constructor(computer: TicTacToeComputerPlayerInterface) {
        this.computer = computer;
        this.currentView = '';
        this.initialControlsVisible = true;
    }

    public switchViewTo(viewState: TicTacToeGameViewState) {
        if (this.initialControlsVisible) {
            this.initialControlsVisible = false;
            $('.ticTacToe--initialization').fadeOut({
                done: () => this.switchTurn(viewState),
                duration: 'slow'
            });
        } else {
            $(this.currentView).fadeOut({
                done: () => this.switchTurn(viewState),
                duration: 'false'
            });
        }
    }

    private switchTurn(viewState: TicTacToeGameViewState) {
        this.currentView = '.ticTacToe--ingame--' + viewState.toString().toLowerCase().replace('_', '-');
        $(this.currentView).fadeIn('fast');

        if (viewState === TicTacToeGameViewState.COMPUTER) {
            this.computer.startFlicker();
        }
    };
}

export default TicTacToeGameView;
