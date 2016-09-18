/// <reference path='../../declarations/angularjs/angular.d.ts' />

import LoggerInterface from '../logger/LoggerInterface';
import TicTacToeComputerPlayerInterface from './players/TicTacToeComputerPlayerInterface';
import TicTacToeComputerPlayerSelector from './players/TicTacToeComputerPlayerSelector';
import TicTacToeGame from './game/TicTacToeGame';
import TicTacToeHumanPlayer from './players/TicTacToeHumanPlayer';
import TicTacToeUIControllerInterface from './TicTacToeUIControllerInterface';
import UIControllerInterface from '../common/UIControllerInterface';

class TicTacToeUIController implements UIControllerInterface {
    public computerPlayerSelector: TicTacToeComputerPlayerSelector;
    public selectLevel: () => void;
    private computer: TicTacToeComputerPlayerInterface;
    private game: TicTacToeGame;
    private human: TicTacToeHumanPlayer;

    constructor($scope: TicTacToeUIControllerInterface, $http: ng.IHttpService, private $logger: LoggerInterface) {
        this.computerPlayerSelector = $scope.computerPlayerSelector || new TicTacToeComputerPlayerSelector();
        this.human = new TicTacToeHumanPlayer();
        this.computerPlayerSelector.makeLevelsSelectable();
        $scope.start = () => this.startGame($scope, $logger);
    }

    private startGame ($scope: TicTacToeUIControllerInterface, $logger: LoggerInterface) {
        this.computer = this.computerPlayerSelector.selectLevel();
        this.human = $scope.human || new TicTacToeHumanPlayer();
        this.game = new TicTacToeGame(this.human, this.computer, $logger);
        $scope.insertAt = this.game.state.board.insertAt;
        $scope.refresh = this.game.refresh;
        $('.ticTacToe--board').show();
        $('.ticTacToe--initialization').hide();
    }
}

export default TicTacToeUIController;
