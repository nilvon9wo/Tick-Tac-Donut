/// <reference path='../declarations/angularjs/angular.d.ts' />
/// <reference path='../declarations/angularjs/angular-route.d.ts' />

'use strict';

import DefaultLogger from './logger/DefaultLogger';
import TicTacToeUIController from './TicTacToe/TicTacToeUIController';

// Declare app level module which depends on views, and components
angular.module('TicTacToeApp', ['ngRoute'])
    .factory('$logger', () => new DefaultLogger())
    .controller('TicTacToeUIController', TicTacToeUIController)
    .config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider
            .when('/', {
                controller: 'TicTacToeUIController',
                templateUrl: './TicTacToe/ticTacToe.html'
            });
    });
