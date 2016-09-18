var PlayerType_1 = require('../../common/PlayerType');
var TicTacToeComputerPlayerActionCalculator_1 = require('./TicTacToeComputerPlayerActionCalculator');
var AbstractTicTacToeComputerPlayer = (function () {
    function AbstractTicTacToeComputerPlayer(actionCalculator) {
        this.playerType = PlayerType_1.default.HUMAN;
        this.actionCalculator = actionCalculator || new TicTacToeComputerPlayerActionCalculator_1.default();
        this.aiFlickerHandle = 0;
    }
    ;
    AbstractTicTacToeComputerPlayer.prototype.plays = function (game) {
        this.game = game;
    };
    ;
    AbstractTicTacToeComputerPlayer.prototype.startFlicker = function () {
        this.aiFlickerHandle = setInterval(function () {
            $('#computer-eye').toggleClass('ticTacToe--ingame--computer-image');
        }, 500);
    };
    ;
    AbstractTicTacToeComputerPlayer.prototype.stopFlicker = function () {
        clearInterval(this.aiFlickerHandle);
    };
    ;
    return AbstractTicTacToeComputerPlayer;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AbstractTicTacToeComputerPlayer;
