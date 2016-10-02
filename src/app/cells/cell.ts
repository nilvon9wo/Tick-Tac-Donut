import Marker  from '../etc/marker.enum';

export class Cell {
    public id: number;
    private DEFAULT_BACKGROUND = 'background';
    private marker: Marker;
    private background = this.DEFAULT_BACKGROUND;

    constructor( id: number ) {
        this.id = id;
    }

    public displayMarker() {
        return Marker[this.marker];
    }

    public getMarker() {
        return this.marker;
    }

    public setMarker( marker: Marker ) {
        if ( !this.marker ) {
            this.marker = marker;
        }
    }
    
    public resetMarker() {
        this.marker = undefined;
        this.background = this.DEFAULT_BACKGROUND;
    }

    public declareWinner() {
        this.background = 'winner';
    }

    public isEmpty() {
        return this.marker === undefined;
    }

}

export default Cell;
