import { map as statusMap } from '../enums/status.js';

export default class FullOrderDto {
    id;
    status;
    quantity;
    user;
    shop;
    products;
    constructor(order, user, fromWarehouse, shop, products) {
        this.id = order.id;
        this.status = statusMap[order.status];
        this.quantity = order.quantity;
        this.user = user;
        this.shop = shop;
        this.products = products;
    }
}
