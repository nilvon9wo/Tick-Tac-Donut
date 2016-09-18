var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractTicTacToeComputerPlayer_1 = require('./AbstractTicTacToeComputerPlayer');
var TicTacToeImpossibleComputerPlayer = (function (_super) {
    __extends(TicTacToeImpossibleComputerPlayer, _super);
    function TicTacToeImpossibleComputerPlayer() {
        _super.apply(this, arguments);
    }
    TicTacToeImpossibleComputerPlayer.prototype.takeTurn = function (state) {
        var availableActions = this.actionCalculator.sortedAvailableActions(state, this.game);
        var chosenAction = availableActions[0];
        this.game.state.board.insertAt(chosenAction.movePosition, state.turn);
        var nextState = chosenAction.applyTo(state);
        this.game.advanceTo(nextState);
    };
    return TicTacToeImpossibleComputerPlayer;
}(AbstractTicTacToeComputerPlayer_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicTacToeImpossibleComputerPlayer;
