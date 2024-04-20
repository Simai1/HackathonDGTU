import Warehouse from "../models/warehouse.js";
import {AppErrorMissing} from "../utils/errors.js";
import Product from "../models/product.js";
import Coord from "../models/coords.js";
import WarehouseDto from "../dtos/warehouse-dto.js";
import ProductDto from "../dtos/product-dto.js";

export default {
    async getAllWarehouses(req, res) {
        const warehouses = await Warehouse.findAll({
            include: [
                {
                    model: Coord,
                }
            ]
        });
        const warehouseDtos = [];
        for (const warehouse of warehouses){
            warehouseDtos.push(new WarehouseDto(warehouse));
        }
        res.json(warehouseDtos);
    },
    async getOneWarehouseProducts({params: {warehouseId}}, res) {
        if (!warehouseId) throw new AppErrorMissing('warehouseId');
        const warehouse = await Warehouse.findByPk(warehouseId, {
            include: [
                {
                    model: Coord,
                }
            ]
        });
        const products = await Product.findAll({ where: { warehouseId: warehouse.id } });
        const warehouseDto = new WarehouseDto(warehouse);
        const productDtos = [];
        for (const product of products){
            productDtos.push(new ProductDto(product));
        }

        res.json({ ... warehouseDto, products: productDtos});
    }
}
