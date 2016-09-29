import Marker  from '../etc/marker.enum';

export class Cell {
    public id: number;
    private marker: Marker;
    private background = 'background';

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

    public declareWinner() {
        this.background = 'winner';
    }

    public isEmpty() {
        return this.marker === undefined;
    }

}

export default Cell;
