import Product from '../models/product.js';
import Shop from '../models/shop.js';
import Warehouse from '../models/warehouse.js';
import ProductInWarehouseDto from '../dtos/productInWarehours-dto.js';
import { Op } from 'sequelize';

export default {
    async getProductsWithWarehouse(req, res) {
        const products = await Product.findAll({
            include: [
                {
                    model: Shop,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'CoordId', 'deletedAt'],
                    },
                },
            ],
        });

        const productInWarehouseDto = products.map(product => new ProductInWarehouseDto(product));
        res.send(productInWarehouseDto);
    },

    async getProductsWitShop(req, res) {
        const products = await Product.findAll({
            include: [
                {
                    model: Shop,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'CoordId', 'deletedAt'],
                    },
                },
            ],
        });

        const productInWarehouseDto = products.map(product => new ProductInWarehouseDto(product));
        res.send(productInWarehouseDto);
    },

    async getExpiryDateProduct(req, res) {
        const currentDate = new Date();
        const fourDaysFromNow = new Date(currentDate);
        fourDaysFromNow.setDate(fourDaysFromNow.getDate() + 4);

        const products = await Product.findAll({
            include: {
                model: Warehouse,
            },
            order: [['expiryDate', 'DESC']],

            where: {
                expiryDate: {
                    [Op.lte]: fourDaysFromNow,
                },
            },
        });
        res.send(products);
    },
};
