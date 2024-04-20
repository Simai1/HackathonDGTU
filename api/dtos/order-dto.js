export default class OfferDto {
    id;
    quantity;
    status;
    warehouseId;
    shopId;
    products;
    user;

    constructor(model) {
        this.id = model.id;
        this.quantity = model.quantity;
        this.status = model.status;
        this.warehouse = model.Warehouse;
        this.shop = model.Shop;
        this.products = model.Product;
        this.user = model.User;
    }
}
