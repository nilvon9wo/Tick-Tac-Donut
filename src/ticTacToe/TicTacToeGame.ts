import LoggerInterface from '../logger/LoggerInterface';
import TicTacToeComputerPlayerInterface from './Players/TicTacToeComputerPlayerInterface';
import TicTacToeMarker from './Markers/TicTacToeMarker';
import TicTacToeState from './TicTacToeState';
import TicTacToeStatus from './TicTacToeStatus';

class TicTacToeGame {
    private state: TicTacToeState;
    private status: TicTacToeStatus;
    private currentTurn: TicTacToeMarker;

    constructor(computer: TicTacToeComputerPlayerInterface) {
        this.makeSquaresClickable();
    }

    public advanceTo(state: TicTacToeState) {
        console.log('Advanding...');
    }

    public refresh($logger: LoggerInterface) {
        $logger.log('Reseting the board...');
        this.state = new TicTacToeState();
    }

    public start() {
        this.state = new TicTacToeState();
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
