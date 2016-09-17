/// <reference path='../../declarations/angularjs/angular.d.ts' />

import PlayerType from '../common/PlayerType';
import LoggerInterface from '../logger/LoggerInterface';
import TicTacToeComputerPlayer from './TicTacToeComputerPlayer';
import TicTacToeGame from './TicTacToeGame';
import TicTacToeHumanPlayer from './TicTacToeHumanPlayer';
import TicTacToeUIControllerInterface from './TicTacToeUIControllerInterface';
import UIControllerInterface from '../common/UIControllerInterface';

class TicTacToeUIController implements UIControllerInterface {
    public currentView: string;
    private human: TicTacToeHumanPlayer;
    private computer: TicTacToeComputerPlayer;
    private initialControlsVisible: boolean;
    private game: TicTacToeGame;

    constructor($scope: TicTacToeUIControllerInterface, $http: ng.IHttpService, private $logger: LoggerInterface) {
        this.initialControlsVisible = true;
        this.currentView = '';
        this.human = new TicTacToeHumanPlayer();
        this.computer = new TicTacToeComputerPlayer();

        $scope.refresh = () => this.game.refresh($logger);
        $scope.start = () => this.start($logger);
        $scope.selectLevel = this.computer.selectLevel;
        $scope.switchViewTo = this.switchViewTo;
    }

    private start($logger: LoggerInterface) {
        $logger.log('Starting the game...');
        this.computer.setLevel();
        this.game = new TicTacToeGame(this.computer);
        this.game.start();
    }

    private switchViewTo (turn: PlayerType) {
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
