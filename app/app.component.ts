import { Component } from '@angular/core';
import { Board } from './Board';

@Component({
  selector: 'tic-tac-toe',
  template:`
    <h1 class="ticTacToe--title">Tick 'Tac Donut</h1>
    <div><label>name: </label>{{hero.name}}</div>
    <div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name">
  </div>
  
    <div class="ticTacToe--board">
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{board.cells[0]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{board.cells[1]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{board.cells[2]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{board.cells[3]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{board.cells[4]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{board.cells[5]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{board.cells[6]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{board.cells[7]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{board.cells[8]}}</div>
    </div>
      `
})
export class AppComponent { 
    title = 'Tick \'Tack Donuts';
    board = new Board();
    hero = {name:'Fred'};
}
