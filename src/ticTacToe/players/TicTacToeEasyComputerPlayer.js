var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractTicTacToeComputerPlayer_1 = require('./AbstractTicTacToeComputerPlayer');
var TicTacToeComputerPlayerAction_1 = require('./TicTacToeComputerPlayerAction');
var TicTacToeEasyComputerPlayer = (function (_super) {
    __extends(TicTacToeEasyComputerPlayer, _super);
    function TicTacToeEasyComputerPlayer() {
        _super.apply(this, arguments);
    }
    TicTacToeEasyComputerPlayer.prototype.takeTurn = function (state) {
        var available = state.emptyCells();
        var randomCell = available[Math.floor(Math.random() * available.length)];
        var chosenAction = new TicTacToeComputerPlayerAction_1.default(randomCell);
        this.game.state.board.insertAt(chosenAction.movePosition, state.turn);
        var nextState = chosenAction.applyTo(state);
        this.game.advanceTo(nextState);
    };
    return TicTacToeEasyComputerPlayer;
}(AbstractTicTacToeComputerPlayer_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicTacToeEasyComputerPlayer;
