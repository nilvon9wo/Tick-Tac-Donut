import LoggerInterface from '../../logger/LoggerInterface';
import PlayerType from '../../common/PlayerType';
import TicTacToeComputerPlayerInterface from '../players/TicTacToeComputerPlayerInterface';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToeState from '../TicTacToeState';
import TicTacToeGameStatus from './TicTacToeGameStatus';

class TicTacToeGame {
    public currentView: string;
    public state: TicTacToeState;

    private computer: TicTacToeComputerPlayerInterface;
    private currentTurn: TicTacToeMarker;
    private logger: LoggerInterface;
    private initialControlsVisible: boolean;
    private status: TicTacToeGameStatus;

    constructor(computer: TicTacToeComputerPlayerInterface, $logger: LoggerInterface) {
        this.computer = computer;
        this.currentView = '';
        this.initialControlsVisible = true;
        this.logger = $logger;
        this.refresh();
        this.makeSquaresClickable();
    }

    public advanceTo(state: TicTacToeState) {
        this.logger.log('Advanding...');
        if (state.isTerminal()) {
            console.log('Evaluating...');
        }
    }

    public refresh() {
        this.logger.log('Reseting the board...');
        this.state = new TicTacToeState();
        this.state.board.reset();
        this.currentTurn = TicTacToeMarker.X;
        this.status = TicTacToeGameStatus.BEGINNING;
    }

    public switchViewTo(turn: PlayerType) {
        if (this.initialControlsVisible) {
            this.initialControlsVisible = false;
            $('.ticTacToe--initialization').fadeOut({
                done: () => this.switchTurn(turn),
                duration: 'slow'
            });
        } else {
            $(this.currentView).fadeOut({
                done: () => this.switchTurn(turn),
                duration: 'false'
            });
        }
    }

    private switchTurn(turn: PlayerType) {
        this.currentView = '.ticTacToe--ingame--' + turn.toString().toLowerCase();
        $(this.currentView).fadeIn('fast');

        if (turn === PlayerType.COMPUTER) {
            this.computer.startFlicker();
        }
    };

    private makeSquaresClickable() {
        $('ticTacToe--board-cell').each(() => {
            const $this = $(this);
            $this.click(() => {
                if (
                    this.status === TicTacToeGameStatus.RUNNING &&
                    this.currentTurn === TicTacToeMarker.X &&
                    $this.hasClass('ticTacToe--board-cell-empty')
                ) {
                    const index = parseInt($this.data('index'), 10);
                    const nextState = new TicTacToeState(this.state);
                    const board = nextState.board;
                    board.set(index, this.currentTurn);
                    board.insertAt(index, this.currentTurn);
                    nextState.advanceTurn();
                    this.advanceTo(nextState);
                }
            });
        });
    }
}

export default TicTacToeGame;
