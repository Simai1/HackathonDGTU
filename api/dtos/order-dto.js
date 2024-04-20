export default class modelDto {
    id;
    from;
    to;
    quantity;
    status;
    warehouse;
    product;
    constructor(model) {
        this.id = model.id;
        this.from = model.from;
        this.to = model.to;
    }
}
