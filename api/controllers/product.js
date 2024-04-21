import Product from '../models/product.js';
import Shop from '../models/shop.js';
import Warehouse from '../models/warehouse.js';
import ProductInWarehouseDto from '../dtos/productInWarehours-dto.js';
import { Op } from 'sequelize';
import ProductDtoWithShop from '../dtos/product-dto-with-shop.js';

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
        fourDaysFromNow.setDate(fourDaysFromNow.getDate() + 4); // добавляем 4 дня к текущей дате

        const products = await Product.findAll({
            include: {
                model: Warehouse,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt', 'CoordId'],
                },
            },
            where: {
                [Op.or]: [
                    {
                        expiryDate: {
                            [Op.lte]: currentDate, // срок годности истек
                        },
                    },
                    {
                        expiryDate: {
                            [Op.lte]: fourDaysFromNow, // срок годности истекает через 4 дня и менее
                        },
                    },
                ],
            },
            order: [
                ['expiryDate', 'ASC'], // сортировка по expiryDate в порядке возрастания
            ],
        });

        res.send(products);
    },

    // Импортируем функцию mapProductDto из модуля productDto

    async getProductsWithShop(req, res) {
        try {
            // Получаем первые пять продуктов с магазинами
            const products = await Product.findAll({
                limit: 5,
                include: [
                    {
                        model: Shop,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'CoordId', 'deletedAt'],
                        },
                    },
                ],
            });

            const productWithShopDto = products.map(product => new ProductDtoWithShop(product));
            res.json(productWithShopDto);
        } catch (error) {
            console.error('Error fetching products with shop:', error);
            res.status(500).json({ error: 'Failed to fetch products with shop' });
        }
    },
};
