import CoordDto from "./coord-dto.js";

export default class WarehouseDto {
    id;
    name;
    quantity;
    Coord;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.quantity = model.quantity;
        this.Coord = new CoordDto(model.Coord);
    }
}
