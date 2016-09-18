/// <reference path='../../declarations/angularjs/angular.d.ts' />

import PlayerType from '../common/PlayerType';
import LoggerInterface from '../logger/LoggerInterface';
import TicTacToeComputerPlayerInterface from './players/TicTacToeComputerPlayerInterface';
import TicTacToeComputerPlayerSelector from './players/TicTacToeComputerPlayerSelector';
import TicTacToeGame from './game/TicTacToeGame';
import TicTacToeHumanPlayer from './players/TicTacToeHumanPlayer';
import TicTacToeUIControllerInterface from './TicTacToeUIControllerInterface';
import UIControllerInterface from '../common/UIControllerInterface';

class TicTacToeUIController implements UIControllerInterface {
    public currentView: string;
    private human: TicTacToeHumanPlayer;
    private computer: TicTacToeComputerPlayerInterface;
    private initialControlsVisible: boolean;
    private game: TicTacToeGame;
    private computerPlayerHelper: TicTacToeComputerPlayerSelector;

    constructor($scope: TicTacToeUIControllerInterface, $http: ng.IHttpService, private $logger: LoggerInterface) {
        this.computerPlayerHelper = $scope.computerPlayerHelper || new TicTacToeComputerPlayerSelector();
        this.initialControlsVisible = true;
        this.currentView = '';
        this.human = new TicTacToeHumanPlayer();

        $scope.refresh = () => this.game.refresh();
        $scope.start = () => this.start($logger);
        $scope.selectLevel = this.computerPlayerHelper.selectLevel;
        $scope.switchViewTo = this.switchViewTo;
    }

    private start($logger: LoggerInterface) {
        $logger.log('Starting the game...');
        this.computer = this.computerPlayerHelper.setLevel();
        this.game = new TicTacToeGame(this.computer, $logger);
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
