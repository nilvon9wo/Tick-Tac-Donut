var TicTacToeComputerPlayerActionComparitor = (function () {
    function TicTacToeComputerPlayerActionComparitor() {
        this.ASCENDING = function (firstAction, secondAction) {
            if (firstAction.miniMaxValue < secondAction.miniMaxValue) {
                return -1;
            }
            else if (firstAction.miniMaxValue > secondAction.miniMaxValue) {
                return 1;
            }
            else {
                return 0;
            }
        };
        this.DESCENDING = function (firstAction, secondAction) {
            if (firstAction.miniMaxValue > secondAction.miniMaxValue) {
                return -1;
            }
            else if (firstAction.miniMaxValue < secondAction.miniMaxValue) {
                return 1;
            }
            else {
                return 0;
            }
        };
    }
    return TicTacToeComputerPlayerActionComparitor;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicTacToeComputerPlayerActionComparitor;
