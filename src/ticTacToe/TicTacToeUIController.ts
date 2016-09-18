/// <reference path='../../declarations/angularjs/angular.d.ts' />

import PlayerType from '../common/PlayerType';
import LoggerInterface from '../logger/LoggerInterface';
import TicTacToeComputerPlayerHelper from './Players/TicTacToeComputerPlayerHelper';
import TicTacToeComputerPlayerInterface from './Players/TicTacToeComputerPlayerInterface';
import TicTacToeGame from './TicTacToeGame';
import TicTacToeHumanPlayer from './Players/TicTacToeHumanPlayer';
import TicTacToeUIControllerInterface from './TicTacToeUIControllerInterface';
import UIControllerInterface from '../common/UIControllerInterface';

class TicTacToeUIController implements UIControllerInterface {
    public currentView: string;
    private human: TicTacToeHumanPlayer;
    private computer: TicTacToeComputerPlayerInterface;
    private initialControlsVisible: boolean;
    private game: TicTacToeGame;
    private computerPlayerHelper: TicTacToeComputerPlayerHelper;

    constructor($scope: TicTacToeUIControllerInterface, $http: ng.IHttpService, private $logger: LoggerInterface) {
        this.computerPlayerHelper = $scope.computerPlayerHelper || new TicTacToeComputerPlayerHelper();
        this.initialControlsVisible = true;
        this.currentView = '';
        this.human = new TicTacToeHumanPlayer();

        $scope.refresh = () => this.game.refresh($logger);
        $scope.start = () => this.start($logger);
        $scope.selectLevel = this.computerPlayerHelper.selectLevel;
        $scope.switchViewTo = this.switchViewTo;
    }

    private start($logger: LoggerInterface) {
        $logger.log('Starting the game...');
        this.computer = this.computerPlayerHelper.setLevel();
        this.game = new TicTacToeGame(this.computer);
        this.game.start();
    }

    private switchViewTo(turn: PlayerType) {
        if (this.initialControlsVisible) {
            this.initialControlsVisible = false;
            $('.ticTacToe--initialization').fadeOut({
                done: () => this.switchTurn(turn),
                duration: 'slow'
            });
        } else {
            $(this.currentView).fadeOut({
                done: () => this.switchTurn(turn),
                duration: 'false'
            });
        }
    }

    private switchTurn(turn: PlayerType) {
        this.currentView = '.ticTacToe--ingame--' + turn.toString().toLowerCase();
        $(this.currentView).fadeIn('fast');

        if (turn === PlayerType.COMPUTER) {
            this.computer.startFlicker();
        }
    };
}

export default TicTacToeUIController;
