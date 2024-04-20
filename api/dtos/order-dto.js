export default class OrderDto {
    id;
    quantity;
    status;
    warehouseId;
    productId;
    userId;

    constructor(model) {
        this.id = model.id;
        this.quantities = model.quantity;
        this.status = model.status;
        this.warehouseId = model.warehouseId;
        this.productId = model.productId;
        this.userId = model.userId;
    }
}
