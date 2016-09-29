import { Component, Input } from '@angular/core';

import Cell from './cell';

@Component( {
    moduleId: module.id,
    selector: 'cell',
    styleUrls: ['cell.component.css'],
    templateUrl: 'cell.component.html'
})

export class CellComponent {
    @Input() public cell: Cell;
}
