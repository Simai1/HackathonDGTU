import { map as statusMap } from '../enums/status.js';

export default class FullOrderDto {
    id;
    status;
    quantity;
    user;
    products;
    createdAt;
    constructor(order, user, products) {
        this.id = order.id;
        this.status = statusMap[order.status];
        this.quantity = order.quantity;
        this.user = user;
        this.products = products;
        this.createdAt = order.createdAt;
    }
}
