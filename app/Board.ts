export class Board {
    public cells: Array<string> = [];
    
    constructor(){
        for (let i = 0; i <= 8; i++) {
            this.cells.push('E');
        }
    }
}