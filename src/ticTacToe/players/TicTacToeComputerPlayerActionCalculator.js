var TicTacToeComputerPlayerAction_1 = require('./TicTacToeComputerPlayerAction');
var TicTacToeComputerPlayerActionComparitor_1 = require('./TicTacToeComputerPlayerActionComparitor');
var TicTacToeMarker_1 = require('../markers/TicTacToeMarker');
var TicTacToeComputerPlayerActionCalculator = (function () {
    function TicTacToeComputerPlayerActionCalculator(actionComparitor) {
        this.actionComparitor = actionComparitor || new TicTacToeComputerPlayerActionComparitor_1.default();
    }
    ;
    TicTacToeComputerPlayerActionCalculator.prototype.miniMaxValue = function (state, game) {
        var _this = this;
        if (state.isTerminal()) {
            return game.score(state);
        }
        var stateScore = (state.turn === TicTacToeMarker_1.default.X) ? -1000 : 1000;
        var availablePositions = state.emptyCells();
        var availableNextStates = availablePositions.map(function (position) {
            var action = new TicTacToeComputerPlayerAction_1.default(position);
            return action.applyTo(state);
        });
        availableNextStates.forEach(function (nextState) {
            var nextScore = _this.miniMaxValue(nextState, game);
            if (state.turn === TicTacToeMarker_1.default.X) {
                if (nextScore > stateScore) {
                    stateScore = nextScore;
                }
            }
            else if (nextScore < stateScore) {
                stateScore = nextScore;
            }
        });
        return stateScore;
    };
    ;
    TicTacToeComputerPlayerActionCalculator.prototype.sortedAvailableActions = function (state, game) {
        var _this = this;
        var available = state.emptyCells();
        var availableActions = available.map(function (position) {
            var action = new TicTacToeComputerPlayerAction_1.default(position);
            var nextAction = action.applyTo(state);
            action.miniMaxValue = _this.miniMaxValue(nextAction, game);
            return action;
        });
        if (state.turn === TicTacToeMarker_1.default.X) {
            availableActions.sort(this.actionComparitor.DESCENDING);
        }
        else {
            availableActions.sort(this.actionComparitor.ASCENDING);
        }
        return availableActions;
    };
    return TicTacToeComputerPlayerActionCalculator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicTacToeComputerPlayerActionCalculator;
