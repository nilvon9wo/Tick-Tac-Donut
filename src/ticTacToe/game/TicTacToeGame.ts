import LoggerInterface from '../../logger/LoggerInterface';
import TicTacToeComputerPlayerInterface from '../players/TicTacToeComputerPlayerInterface';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToeState from '../TicTacToeState';
import TicTacToeStatus from '../TicTacToeStatus';

class TicTacToeGame {
    private computer: TicTacToeComputerPlayerInterface;
    private currentTurn: TicTacToeMarker;
    private logger: LoggerInterface;
    private state: TicTacToeState;
    private status: TicTacToeStatus;

    constructor(computer: TicTacToeComputerPlayerInterface, $logger: LoggerInterface) {
        this.computer = computer;
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
        this.status = TicTacToeStatus.BEGINNING;
    }

    private makeSquaresClickable() {
        $('ticTacToe--board-cell').each(() => {
            const $this = $(this);
            $this.click(() => {
                if (
                    this.status === TicTacToeStatus.RUNNING &&
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
