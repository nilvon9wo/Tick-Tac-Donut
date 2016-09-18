var TicTacToeStateStatus;
(function (TicTacToeStateStatus) {
    TicTacToeStateStatus[TicTacToeStateStatus["STILL_RUNNING"] = 0] = "STILL_RUNNING";
    TicTacToeStateStatus[TicTacToeStateStatus["X_WON"] = 1] = "X_WON";
    TicTacToeStateStatus[TicTacToeStateStatus["O_WON"] = 2] = "O_WON";
    TicTacToeStateStatus[TicTacToeStateStatus["DRAW"] = 3] = "DRAW";
})(TicTacToeStateStatus || (TicTacToeStateStatus = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicTacToeStateStatus;
