import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';

export const ROUTES: Routes = [
    { component: BoardComponent, path: '' },
    { component: BoardComponent, path: 'board' },
    { component: BoardComponent, path: 'home' },
    { component: BoardComponent, path: 'tic-tac-toe' }
];
