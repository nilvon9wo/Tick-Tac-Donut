var TicTacToeBoard_1 = require('./game/TicTacToeBoard');
var TicTacToeMarker_1 = require('./markers/TicTacToeMarker');
var TicTacToeStateStatus_1 = require('./TicTacToeStateStatus');
var TicTacToeState = (function () {
    function TicTacToeState(oldState) {
        this.oMoveCount = 0;
        this.emptyCells = this.board.emptyCells;
        this.turn = null;
        this.oMoveCount = 0;
        this.result = TicTacToeStateStatus_1.default.STILL_RUNNING;
        this.board = new TicTacToeBoard_1.default;
        if (oldState) {
            this.copyFromOldState(oldState);
        }
    }
    TicTacToeState.prototype.advanceTurn = function () {
        this.turn = (this.turn === TicTacToeMarker_1.default.X) ?
            TicTacToeMarker_1.default.O :
            TicTacToeMarker_1.default.X;
    };
    TicTacToeState.prototype.isTerminal = function () {
        this.result = this.board.status();
        return this.result !== TicTacToeStateStatus_1.default.STILL_RUNNING;
    };
    TicTacToeState.prototype.copyFromOldState = function (oldState) {
        this.board = oldState.board.clone();
        this.result = oldState.result;
        this.turn = oldState.turn;
    };
    return TicTacToeState;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicTacToeState;
