var TicTacToeMarker_1 = require('../Markers/TicTacToeMarker');
var TicTacToeState_1 = require('../TicTacToeState');
var TicTacToeComputerPlayerAction = (function () {
    function TicTacToeComputerPlayerAction(position) {
        this.movePosition = position;
        this.miniMaxValue = 0;
    }
    TicTacToeComputerPlayerAction.prototype.applyTo = function (state) {
        var nextState = new TicTacToeState_1.default(state);
        var nextBoard = nextState.board;
        nextBoard.set(this.movePosition, state.turn);
        if (state.turn === TicTacToeMarker_1.default.O) {
            nextState.oMoveCount++;
        }
        nextState.advanceTurn();
        return nextState;
    };
    return TicTacToeComputerPlayerAction;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicTacToeComputerPlayerAction;
