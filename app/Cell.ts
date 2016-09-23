import  Marker  from './Marker';

export class Cell {
    id: number;
    marker: Marker;

    constructor(id: number){
        this.id = id;
    }
    
    getMarker() {
        return Marker[this.marker];
    }
  }

export default Cell;