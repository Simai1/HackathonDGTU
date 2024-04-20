import { map as productNameMap } from '../enums/product.js';
export default class ProductInWarehouseDto {
    id;
    productName;
    expiryDate;
    productQuantity;
    warehouse;
    shop;
    products;

    constructor(model) {
        this.id = model.id;
        this.productName = productNameMap[model.productName];
        this.expiryDate = model.expiryDate;
        this.productQuantity = model.productQuantity;
        this.shop = model.Shop;
        this.warehouse = model.Warehouse;
    }
}
