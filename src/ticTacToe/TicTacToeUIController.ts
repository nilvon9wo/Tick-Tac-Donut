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
        this.computerPlayerSelector = $scope.computerPlayerHelper || new TicTacToeComputerPlayerSelector();
        this.human = new TicTacToeHumanPlayer();

        $scope.start = () => this.start($scope, $logger);
        this.selectLevel = this.computerPlayerSelector.selectLevel;
    }

    public start($scope: TicTacToeUIControllerInterface, $logger: LoggerInterface) {
        $logger.log('Starting the game...');
        this.computer = this.computerPlayerSelector.setLevel();
        this.game = new TicTacToeGame(this.computer, $logger);
        $scope.insertAt = this.game.state.board.insertAt;
        $scope.refresh = this.game.refresh;
        $scope.switchViewTo = this.game.switchViewTo;
    }
}

export default TicTacToeUIController;
