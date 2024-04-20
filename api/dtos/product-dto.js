import {map as productNameMap} from "../enums/product.js";
import {map as measureMap} from "../enums/measure.js";
export default class ProductDto {
    id;
    name;
    cost;
    manufactureDate;
    expiryDate;
    sku;
    region;
    amount;
    measure;
    volume;
    manufacturer;
    quantity;
    orderId;


    constructor(model) {
        this.id = model.id;
        this.name = productNameMap[model.productName];
        this.cost = model.productCost;
        this.manufactureDate = model.manufactureDate;
        this.expiryDate = model.expiryDate;
        this.sku = model.sku;
        this.region = model.region;
        this.amount = model.productAmount;
        this.measure = measureMap[model.productMeasure];
        this.volume = model.productVolume;
        this.manufacturer = model.manufacture;
        this.quantity = model.productQuantity;
        this.orderId = model.orderId;
    }
}
