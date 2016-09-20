/// <reference path='../../../declarations/angularjs/angular.d.ts' />

import TicTacToeComputerPlayerInterface from './players/TicTacToeComputerPlayerInterface';
import TicTacToeComputerPlayerSelector from './players/TicTacToeComputerPlayerSelector';
import TicTacToeGame from './game/TicTacToeGame';
import TicTacToeHumanPlayer from './players/TicTacToeHumanPlayer';
import TicTacToeUIControllerInterface from './TicTacToeUIControllerInterface';

class TicTacToeUIController {
    public computerPlayerSelector: TicTacToeComputerPlayerSelector;
    public selectLevel: () => void;
    private computer: TicTacToeComputerPlayerInterface;
    private game: TicTacToeGame;
    private human: TicTacToeHumanPlayer;

    constructor($scope: TicTacToeUIControllerInterface, $http: ng.IHttpService) {
        this.computerPlayerSelector = $scope.computerPlayerSelector || new TicTacToeComputerPlayerSelector();
        this.human = new TicTacToeHumanPlayer();
        this.computerPlayerSelector.makeLevelsSelectable();
        $scope.start = () => this.startGame($scope);
    }

    private startGame ($scope: TicTacToeUIControllerInterface) {
        this.computer = this.computerPlayerSelector.selectLevel();
        this.human = $scope.human || new TicTacToeHumanPlayer();
        this.game = new TicTacToeGame(this.human, this.computer);
        this.computer.plays(this.game);
        $scope.refresh = () => this.game.refresh();
        $('.ticTacToe--board').show();
        $('.ticTacToe--initialization').hide();
    }
}

export default TicTacToeUIController;
