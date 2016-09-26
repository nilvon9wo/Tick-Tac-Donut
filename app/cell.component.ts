import { Component, Input } from '@angular/core';

import Cell from './cell';

@Component({
    moduleId: module.id,
    selector: 'cell',
    templateUrl: 'cell.component.html',
    styleUrls: ['cell.component.css']
})

export class CellComponent {
    @Input() cell: Cell;
}
