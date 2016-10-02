import { BoardComponent }   from './board/board.component';
import { BrowserModule } from '@angular/platform-browser';
import { CellComponent }   from './cells/cell.component';
import { FormsModule }   from '@angular/forms';
import { NgModule }      from '@angular/core';
import { TicTacToeComponent }   from './ticTacToe/ticTacToe.component';

@NgModule({
  bootstrap:    [ TicTacToeComponent ],
  declarations: [ TicTacToeComponent, BoardComponent, CellComponent ],
  imports:      [ BrowserModule, FormsModule ]
})
export class AppModule { }
