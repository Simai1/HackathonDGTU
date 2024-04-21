export default class OrderDto {
    id;
    quantity;
    status;
    warehouseId;
    shopId;
    userId;
    products;

    constructor(model) {
        this.id = model.id;
        this.quantities = model.quantity;
        this.status = model.status;
        this.warehouseId = model.warehouseId;
        this.shopId = model.shopId;
        this.userId = model.userId;
        this.products = model.products;
    }
}
