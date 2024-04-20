export default class OfferDto {
    id;
    quantity;
    status;
    warehouseId;
    productId;
    userId;

    constructor(model) {
        this.id = model.id;
        this.quantity = model.quantity;
        this.status = model.status;
        this.warehouseId = model.warehouseId;
        this.productId = model.productId;
        this.userId = model.userId !== undefined ? model.userId : null; // Устанавливаем userId в null, если его нет в модели
    }
}
