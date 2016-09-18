var TicTacToeGameStatus_1 = require('./TicTacToeGameStatus');
var TicTacToeGameView_1 = require('./TicTacToeGameView');
var TicTacToeGameViewState_1 = require('./TicTacToeGameViewState');
var TicTacToeMarker_1 = require('../markers/TicTacToeMarker');
var TicTacToeState_1 = require('../TicTacToeState');
var TicTacToeStateStatus_1 = require('../TicTacToeStateStatus');
var TicTacToeGame = (function () {
    function TicTacToeGame(human, computer, logger) {
        this.playerByMarker = new Map();
        this.computer = computer;
        this.human = human;
        this.logger = logger;
        this.playerByMarker.set(TicTacToeMarker_1.default.O, computer);
        this.playerByMarker.set(TicTacToeMarker_1.default.X, human);
        this.refresh();
        this.makeSquaresClickable();
        this.view = new TicTacToeGameView_1.default(computer);
    }
    TicTacToeGame.prototype.advanceTo = function (state) {
        this.logger.log('Advanding...');
        if (state.isTerminal()) {
            this.status = TicTacToeGameStatus_1.default.FINISHED;
            this.view.switchViewTo(this.winner(state.result));
        }
        else {
            var nextPlayer = this.upNext();
            if (nextPlayer === this.human) {
                this.view.switchViewTo(TicTacToeGameViewState_1.default.HUMAN);
            }
            else {
                this.view.switchViewTo(TicTacToeGameViewState_1.default.COMPUTER);
                this.computer.takeTurn(this.state);
            }
        }
    };
    TicTacToeGame.prototype.refresh = function () {
        this.logger.log('Reseting the board...');
        this.state = new TicTacToeState_1.default();
        this.state.board.reset();
        this.currentTurn = TicTacToeMarker_1.default.X;
        this.status = TicTacToeGameStatus_1.default.BEGINNING;
    };
    TicTacToeGame.prototype.score = function (state) {
        switch (state.result) {
            case TicTacToeStateStatus_1.default.X_WON: return 10 - state.oMoveCount;
            case TicTacToeStateStatus_1.default.O_WON: return 10 + state.oMoveCount;
            default: return 0;
        }
    };
    TicTacToeGame.prototype.makeSquaresClickable = function () {
        var _this = this;
        $('ticTacToe--board-cell').each(function () {
            var $this = $(_this);
            $this.click(function () {
                if (_this.status === TicTacToeGameStatus_1.default.RUNNING &&
                    _this.currentTurn === TicTacToeMarker_1.default.X &&
                    $this.hasClass('ticTacToe--board-cell-empty')) {
                    var index = parseInt($this.data('index'), 10);
                    var nextState = new TicTacToeState_1.default(_this.state);
                    var board = nextState.board;
                    board.set(index, _this.currentTurn);
                    board.insertAt(index, _this.currentTurn);
                    nextState.advanceTurn();
                    _this.advanceTo(nextState);
                }
            });
        });
    };
    TicTacToeGame.prototype.upNext = function () {
        var turn = this.state.turn.toString();
        var turnMarker = (turn === 'X') ? TicTacToeMarker_1.default.X : TicTacToeMarker_1.default.O;
        return this.playerByMarker.get(turnMarker);
    };
    TicTacToeGame.prototype.winner = function (result) {
        if (result === TicTacToeStateStatus_1.default.DRAW) {
            return TicTacToeGameViewState_1.default.DRAW;
        }
        var winnerString = result.toString().charAt(0);
        var winnerMarker = (winnerString === 'X') ? TicTacToeMarker_1.default.X : TicTacToeMarker_1.default.O;
        var winner = this.playerByMarker.get(winnerMarker);
        if (winner === this.human) {
            return TicTacToeGameViewState_1.default.HUMAN_WON;
        }
        return TicTacToeGameViewState_1.default.COMPUTER_WON;
    };
    return TicTacToeGame;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicTacToeGame;
