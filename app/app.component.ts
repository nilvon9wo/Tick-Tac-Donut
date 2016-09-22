import { Component } from '@angular/core';
@Component({
  selector: 'tic-tac-toe',
  template:`
    <h2>{{hero.name}} details!</h2>
    <div><label>name: </label>{{hero.name}}</div>
    <div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name">
  </div>
  
    <div class="ticTacToe--board">
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{cells[0]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{cells[1]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{cells[2]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{cells[3]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{cells[4]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{cells[5]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{cells[6]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{cells[7]}}</div>
        <div class="ticTacToe--board-cell--background ticTacToe--board-cell--empty">{{cells[8]}}</div>
    </div>
      `
})
export class AppComponent { 
    title = 'Tick \'Tack Donuts';
    cells = ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];
    hero = {name:'Fred'};
}
