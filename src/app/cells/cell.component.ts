import { Component, Input } from '@angular/core';

import Cell from './cell';

@Component( {
    selector: 'cell',
    styles: [require('./cell.component.css')],
    template: require('./cell.component.html')
})

export class CellComponent {
    @Input() public cell: Cell;
}
