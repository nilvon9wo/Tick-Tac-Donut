/// <reference path="../../../declarations/es6-collections/es6-collections.d.ts" />

import LoggerInterface from '../../logger/LoggerInterface';
import TicTacToeComputerPlayerInterface from '../players/TicTacToeComputerPlayerInterface';
import TicTacToeGameStatus from './TicTacToeGameStatus';
import TicTacToeGameView from './TicTacToeGameView';
import TicTacToeGameViewState from './TicTacToeGameViewState';
import TicTacToeHumanPlayer from '../players/TicTacToeHumanPlayer';
import TicTacToeMarker from '../markers/TicTacToeMarker';
import TicTacToePlayerInterface from '../players/TicTacToePlayerInterface';
import TicTacToeState from '../TicTacToeState';
import TicTacToeStateStatus from '../TicTacToeStateStatus';

class TicTacToeGame {
    public state: TicTacToeState;

    private computer: TicTacToeComputerPlayerInterface;
    private currentTurn: TicTacToeMarker;
    private human: TicTacToeHumanPlayer;
    private logger: LoggerInterface;
    private status: TicTacToeGameStatus;
    private playerByMarker: Map<TicTacToeMarker, TicTacToePlayerInterface> =
        new Map<TicTacToeMarker, TicTacToePlayerInterface>();
    private view: TicTacToeGameView;

    constructor(human: TicTacToeHumanPlayer, computer: TicTacToeComputerPlayerInterface, logger: LoggerInterface) {
        this.computer = computer;
        this.human = human;
        this.logger = logger;
        this.playerByMarker.set(TicTacToeMarker.X, human);
        this.playerByMarker.set(TicTacToeMarker.O, computer);
        this.refresh(logger);
        this.view = new TicTacToeGameView(computer);
        this.status = TicTacToeGameStatus.RUNNING;
        this.currentTurn = TicTacToeMarker.X;
        this.makeSquaresClickable();
    }

    public advanceTo(state: TicTacToeState) {
        this.logger.log('Advancing...');
        if (state.isTerminal()) {
            this.status = TicTacToeGameStatus.FINISHED;
            this.view.switchViewTo(this.winner(state.result));
        } else {
            const nextPlayer = this.upNext();
            if (nextPlayer === this.human) {
                this.view.switchViewTo(TicTacToeGameViewState.HUMAN);
            } else {
                this.view.switchViewTo(TicTacToeGameViewState.COMPUTER);
                this.computer.takeTurn(this.state);
            }
        }
    }

    public refresh(logger: LoggerInterface) {
        logger.log('Reseting the board...');
        this.state = new TicTacToeState();
        this.state.board.reset();
        this.currentTurn = TicTacToeMarker.X;
        this.status = TicTacToeGameStatus.BEGINNING;
    }

    public score(state: TicTacToeState) {
        switch (state.result) {
            case TicTacToeStateStatus.X_WON: return 10 - state.oMoveCount;
            case TicTacToeStateStatus.O_WON: return 10 + state.oMoveCount;
            default: return 0;
        }
    }

    private makeSquaresClickable() {
        const self = this;
        $('[class^="ticTacToe--board-cell--"]').each(function() {
            const $this = $(this);
            $this.click(function() {
                if (
                    self.status === TicTacToeGameStatus.RUNNING &&
                    self.currentTurn === TicTacToeMarker.X &&
                    $this.hasClass('ticTacToe--board-cell--empty')
                ) {
                    const index = parseInt($this.data('index'), 10);
                    const nextState = new TicTacToeState(self.state);
                    const board = nextState.board;
                    board.set(index, self.currentTurn);
                    board.insertAt(index, self.currentTurn);
                    nextState.advanceTurn();
                    self.advanceTo(nextState);
                }
            });
        });
    }

    private upNext() {
        const turn = this.state.turn.toString();
        const turnMarker = (turn === 'X') ? TicTacToeMarker.X : TicTacToeMarker.O;
        return this.playerByMarker.get(turnMarker);
    }

    private winner(result: TicTacToeStateStatus) {
        if (result === TicTacToeStateStatus.DRAW) {
            return TicTacToeGameViewState.DRAW;
        }

        const winnerString = result.toString().charAt(0);
        const winnerMarker = (winnerString === 'X') ?  TicTacToeMarker.X : TicTacToeMarker.O;
        const winner = this.playerByMarker.get(winnerMarker);

        if (winner === this.human) {
            return TicTacToeGameViewState.HUMAN_WON;
        }

        return TicTacToeGameViewState.COMPUTER_WON;
    }


}

export default TicTacToeGame;
