export default class CoordDto {
    id;
    x;
    y;
    markerColor;


    constructor(model) {
        this.id = model.id;
        this.x = model.coordsX;
        this.y = model.coordsY;
        this.markerColor = model.markerColor;
    }
}
