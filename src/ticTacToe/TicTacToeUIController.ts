/// <reference path='../../declarations/angularjs/angular.d.ts' />

import LoggerInterface from '../logger/LoggerInterface';
import TicTacToeUIControllerInterface from './TicTacToeUIControllerInterface';
import UIControllerInterface from '../common/UIControllerInterface';

class TicTacToeUIController implements UIControllerInterface {
    constructor($scope: TicTacToeUIControllerInterface, $http: ng.IHttpService, private $logger: LoggerInterface) {
        $scope.refresh = () => {};
    }
}

export default TicTacToeUIController;
