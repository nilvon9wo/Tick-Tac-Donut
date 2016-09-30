import { Component, Input } from '@angular/core';

import Cell from './cell';

@Component( {
    //moduleId: module.id, -- unnecessary and incompatible with webpack
    selector: 'cell',
    styles: [require('./cell.component.css')],
    template: require('./cell.component.html')
})

export class CellComponent {
    @Input() public cell: Cell;
}
