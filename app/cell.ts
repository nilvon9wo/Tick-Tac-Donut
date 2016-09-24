import  Marker  from './marker.enum';

export class Cell {
    id: number;
    private marker: Marker;
    private background = "background";

    constructor(id: number){
        this.id = id;
    }

    displayMarker() {
        return Marker[this.marker];
    }
    
    getMarker() {
        return this.marker;
    }
    
    setMarker(marker: Marker) {
        if (!this.marker) {
            this.marker = marker;
        }
    }
    
    declareWinner() {
        this.background = "winner";
    }
    
    isEmpty() {
        return this.marker === undefined;
    }
    
  }

export default Cell;