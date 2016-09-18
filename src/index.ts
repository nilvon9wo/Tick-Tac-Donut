/// <reference path='../declarations/angularjs/angular.d.ts' />
/// <reference path='../declarations/angularjs/angular-route.d.ts' />

'use strict';

import DefaultLogger from './logger/DefaultLogger';
import TicTacToeUIController from './ticTacToe/TicTacToeUIController';

// Declare app level module which depends on views, and components
angular.module('TicTacToeApp', ['ngRoute'])
    .factory('$logger', () => new DefaultLogger())
    .controller('TicTacToeUIController', TicTacToeUIController)
    .config(($routeProvider: ng.route.IRouteProvider) => {
        console.log('$routeProvider', $routeProvider);
        $routeProvider
            .when('/', {
                controller: 'TicTacToeUIController',
                templateUrl: './ticTacToe/tic-tac-toe.html'
            });
    });
