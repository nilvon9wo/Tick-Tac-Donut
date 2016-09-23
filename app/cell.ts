import  Marker  from './Marker';

export class Cell {
    id: number;
    private marker: Marker;

    constructor(id: number){
        this.id = id;
    }
    
    getMarker() {
        return Marker[this.marker];
    }
    
    setMarker(marker: Marker) {
        if (!this.marker) {
            this.marker = marker;
        }
    }
    
  }

export default Cell;