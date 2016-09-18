var TicTacToeGameViewState_1 = require('./TicTacToeGameViewState');
var TicTacToeGameView = (function () {
    function TicTacToeGameView(computer) {
        this.computer = computer;
        this.currentView = '';
        this.initialControlsVisible = true;
    }
    TicTacToeGameView.prototype.switchViewTo = function (viewState) {
        var _this = this;
        if (this.initialControlsVisible) {
            this.initialControlsVisible = false;
            $('.ticTacToe--initialization').fadeOut({
                done: function () { return _this.switchTurn(viewState); },
                duration: 'slow'
            });
        }
        else {
            $(this.currentView).fadeOut({
                done: function () { return _this.switchTurn(viewState); },
                duration: 'false'
            });
        }
    };
    TicTacToeGameView.prototype.switchTurn = function (viewState) {
        this.currentView = '.ticTacToe--ingame--' + viewState.toString().toLowerCase().replace('_', '-');
        $(this.currentView).fadeIn('fast');
        if (viewState === TicTacToeGameViewState_1.default.COMPUTER) {
            this.computer.startFlicker();
        }
    };
    ;
    return TicTacToeGameView;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicTacToeGameView;
