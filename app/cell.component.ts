import { Component, Input } from '@angular/core';

import Cell from './cell';

@Component({
    selector: 'cell',
    templateUrl: 'app/cell.component.html',
    styleUrls: ['app/cell.component.css']
})

export class CellComponent {
    @Input()
    cell = Cell;
}