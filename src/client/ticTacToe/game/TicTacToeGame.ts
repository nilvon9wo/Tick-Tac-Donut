/// <reference path="../../../../declarations/es6-collections/es6-collections.d.ts" />

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
    private status: TicTacToeGameStatus;
    private playerByMarker: Map<TicTacToeMarker, TicTacToePlayerInterface> =
        new Map<TicTacToeMarker, TicTacToePlayerInterface>();
    private view: TicTacToeGameView;

    constructor(human: TicTacToeHumanPlayer, computer: TicTacToeComputerPlayerInterface) {
        this.computer = computer;
        this.human = human;
        this.playerByMarker.set(TicTacToeMarker.X, human);
        this.playerByMarker.set(TicTacToeMarker.O, computer);
        this.refresh();
        this.view = new TicTacToeGameView(computer);
        this.status = TicTacToeGameStatus.RUNNING;
        this.currentTurn = TicTacToeMarker.X;
        this.makeSquaresClickable();
    }

    public advanceTo(state: TicTacToeState) {
        if (state.isTerminal()) {
            this.status = TicTacToeGameStatus.FINISHED;
            this.view.switchViewTo(this.winner(state.result));
        } else {
            const nextPlayer = this.nextUp();
            if (nextPlayer === this.human) {
                this.view.switchViewTo(TicTacToeGameViewState.HUMAN);
            } else {
                this.view.switchViewTo(TicTacToeGameViewState.COMPUTER);
                this.computer.takeTurn(state);
            }
        }
    }

    public refresh() {
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
                    nextState.toggleTurn();
                    self.advanceTo(nextState);
                }
            });
        });
    }

    private nextUp() {
        const isXTurn = this.state.turn &&  TicTacToeMarker[this.state.turn] === 'X';
        const turnMarker = isXTurn ? TicTacToeMarker.X : TicTacToeMarker.O;
        return this.playerByMarker.get(turnMarker);
    }

    private winner(result: TicTacToeStateStatus) {
        if (result === TicTacToeStateStatus.DRAW) {
            return TicTacToeGameViewState.DRAW;
        }

        const winnerString = TicTacToeStateStatus[result].charAt(0);
        const winnerMarker = (winnerString === 'X') ?  TicTacToeMarker.X : TicTacToeMarker.O;
        const winner = this.playerByMarker.get(winnerMarker);

        if (winner === this.human) {
            return TicTacToeGameViewState.HUMAN_WON;
        }

        return TicTacToeGameViewState.COMPUTER_WON;
    }


}

export default TicTacToeGame;
