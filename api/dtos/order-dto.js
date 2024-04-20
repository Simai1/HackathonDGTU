export default class OfferDto {
    id;
    quantity;
    status;
    warehouseId;
    shopId;
    products;
    userId;

    constructor(model) {
        this.id = model.id;
        this.quantity = model.quantity;
        this.status = model.status;
        this.warehouseId = model.warehouseId;
        this.shopId = model.shopId;
        this.products = model.products;
        this.userId = model.userId;
    }
}
