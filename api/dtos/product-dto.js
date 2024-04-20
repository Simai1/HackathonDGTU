import { map as productNameMap } from '../enums/product.js';
import { map as productMeasureMap } from '../enums/measure.js';
import { map as storeNameMap } from '../enums/store-name.js';
export default class ProductDto {
    id;
    productName;
    productCost;
    manufactureDate;
    expiryDate;
    SKU;
    storeName;
    storeAddress;
    region;
    saleDate;
    quantitySold;
    productMeasure;
    productVolume;
    manufacture;
    orderId;
    warehouseId;
    shopId;

    constructor(model) {
        this.id = model.id;
        this.productName = productNameMap[model.productName];
        this.productCost = model.productCost;
        this.manufactureDate = model.manufactureDate;
        this.expiryDate = model.expiryDate;
        this.SKU = model.SKU;
        this.storeName = storeNameMap[model.storeName];
        this.storeAddress = model.storeAddress;
        this.region = model.region;
        this.saleDate = model.saleDate;
        this.quantitySold = model.quantitySold;
        this.productMeasure = productMeasureMap[model.productMeasure];
        this.productVolume = model.productVolume;
        this.manufacture = model.manufacture;
        this.orderId = model.orderId;
        this.warehouseId = model.warehouseId;
        this.shopId = model.shopId;
    }
}
