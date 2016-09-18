var TicTacToeBadLocationError_1 = require('./TicTacToeBadLocationError');
var TicTacToeBadPlayerError_1 = require('../players/TicTacToeBadPlayerError');
var TicTacToeMarker_1 = require('../markers/TicTacToeMarker');
var TicTacToeStateStatus_1 = require('../TicTacToeStateStatus');
var TicTacToeBoard = (function () {
    function TicTacToeBoard() {
        this.squares = new Array();
    }
    TicTacToeBoard.prototype.clone = function () {
        var newBoard = new TicTacToeBoard();
        this.squares.forEach(function (marker, index) {
            newBoard.squares[index] = marker;
        });
        return newBoard;
    };
    TicTacToeBoard.prototype.emptyCells = function () {
        var emptyCells = new Array();
        this.squares.forEach(function (marker, index) {
            if (!marker) {
                emptyCells.push(index);
            }
        });
        return emptyCells;
    };
    TicTacToeBoard.prototype.insertAt = function (index, marker) {
        var board = $('.ticTacToe--board-cell');
        var targetCell = $(board[index]);
        if (targetCell.hasClass('ticTacToe--board-cell--empty')) {
            var symbol = marker.toString().toLowerCase();
            targetCell.html(symbol);
            targetCell.removeClass('ticTacToe--board-cell--empty');
            targetCell.addClass('ticTacToe--board-cell--' + symbol);
        }
    };
    TicTacToeBoard.prototype.set = function (location, marker) {
        if (location < 0 || location > 8) {
            throw new TicTacToeBadLocationError_1.default('Invalid y coordinate: ' + location);
        }
        this.squares[location] = marker;
    };
    TicTacToeBoard.prototype.reset = function () {
        for (var i = 0; i <= 8; i++) {
            this.set(i, null);
        }
    };
    TicTacToeBoard.prototype.status = function () {
        var rowsStatus = this.checkRows();
        if (rowsStatus !== TicTacToeStateStatus_1.default.STILL_RUNNING) {
            return rowsStatus;
        }
        var columnStatus = this.checkColumns();
        if (columnStatus !== TicTacToeStateStatus_1.default.STILL_RUNNING) {
            return columnStatus;
        }
        var diagnalStatus = this.checkDiagnals();
        if (diagnalStatus !== TicTacToeStateStatus_1.default.STILL_RUNNING) {
            return diagnalStatus;
        }
        return this.isDraw();
    };
    TicTacToeBoard.prototype.checkDiagnals = function () {
        for (var i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
            if (!this.squares[i]) {
                return TicTacToeStateStatus_1.default.STILL_RUNNING;
            }
            var owner = this.squares[i];
            var secondRequiredSquare = i + j;
            var thirdRequiredSquare = i + 2 * j;
            if (owner === this.squares[secondRequiredSquare] &&
                owner === this.squares[thirdRequiredSquare]) {
                this.markWinner([i, secondRequiredSquare, thirdRequiredSquare]);
                return this.selectWinner(owner);
            }
        }
        return TicTacToeStateStatus_1.default.STILL_RUNNING;
    };
    TicTacToeBoard.prototype.checkColumns = function () {
        return this.check({
            additionalSquaresRequired: [3, 6],
            squareIncrement: 1,
            squaresUntil: 2
        });
    };
    TicTacToeBoard.prototype.checkRows = function () {
        return this.check({
            additionalSquaresRequired: [1, 2],
            squareIncrement: 3,
            squaresUntil: 6
        });
    };
    TicTacToeBoard.prototype.check = function (config) {
        for (var i = 0; i <= config.squaresUntil; i = i + config.squareIncrement) {
            if (!this.squares[i]) {
                return TicTacToeStateStatus_1.default.STILL_RUNNING;
            }
            var owner = this.squares[i];
            var secondRequiredSquare = i + config.additionalSquaresRequired[0];
            var thirdRequiredSquare = i + config.additionalSquaresRequired[1];
            if (owner === this.squares[secondRequiredSquare] &&
                owner === this.squares[thirdRequiredSquare]) {
                this.markWinner([i, secondRequiredSquare, thirdRequiredSquare]);
                return this.selectWinner(owner);
            }
        }
        return TicTacToeStateStatus_1.default.STILL_RUNNING;
    };
    TicTacToeBoard.prototype.isDraw = function () {
        var available = this.emptyCells();
        if (available.length === 0) {
            return TicTacToeStateStatus_1.default.DRAW;
        }
        else {
            return TicTacToeStateStatus_1.default.STILL_RUNNING;
        }
    };
    TicTacToeBoard.prototype.markWinner = function (winningSquares) {
        var board = $('.ticTacToe--board-cell--background');
        winningSquares.forEach(function (index) {
            var targetSquare = $(board[index]);
            targetSquare.removeClass('ticTacToe--board-cell--background');
            targetSquare.addClass('ticTacToe--board-cell--win');
        });
    };
    TicTacToeBoard.prototype.selectWinner = function (marker) {
        switch (marker) {
            case (TicTacToeMarker_1.default.O): return TicTacToeStateStatus_1.default.O_WON;
            case (TicTacToeMarker_1.default.X): return TicTacToeStateStatus_1.default.X_WON;
        }
        throw new TicTacToeBadPlayerError_1.default('Invalid player: ' + marker);
    };
    return TicTacToeBoard;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicTacToeBoard;
