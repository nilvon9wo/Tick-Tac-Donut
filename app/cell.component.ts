import { Component, Input } from '@angular/core';
import { Cell } from './cell';

@Component({
    selector: 'cell',
    template: `
        <div class="ticTacToe--board-cell--background">
            <div class="ticTacToe--board-cell--{{cell.getMarker()}}">{{cell.getMarker()}}</div>
        </div>
      `
})

export class CellComponent {
    @Input()
    cell = Cell;
}