var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractTicTacToeComputerPlayer_1 = require('./AbstractTicTacToeComputerPlayer');
var TicTacToeModerateComputerPlayer = (function (_super) {
    __extends(TicTacToeModerateComputerPlayer, _super);
    function TicTacToeModerateComputerPlayer() {
        _super.apply(this, arguments);
        this.MAX_SKILL = 100;
        this.PLAYER_SKILL = 50;
    }
    TicTacToeModerateComputerPlayer.prototype.takeTurn = function (state) {
        var availableActions = this.actionCalculator.sortedAvailableActions(state, this.game);
        var isActingSmart = Math.random() * this.MAX_SKILL <= this.PLAYER_SKILL;
        var hasNoChoices = availableActions.length < 2;
        var choice = (isActingSmart || hasNoChoices) ? 0 : 1;
        var chosenAction = availableActions[choice];
        this.game.state.board.insertAt(chosenAction.movePosition, state.turn);
        var nextState = chosenAction.applyTo(state);
        this.game.advanceTo(nextState);
    };
    return TicTacToeModerateComputerPlayer;
}(AbstractTicTacToeComputerPlayer_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicTacToeModerateComputerPlayer;
