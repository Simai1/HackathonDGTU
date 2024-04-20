import Order from '../models/order.js';
import User from '../models/user.js';
import OrderDto from '../dtos/order-dto.js';
import status from '../enums/status.js';
import roles from '../config/roles.js';
import ProductInOrder from '../models/productInOrder.js';
import Warehouse from '../models/warehouse.js';
import Shop from '../models/shop.js';
import { Op } from 'sequelize';
import Product from '../models/product.js';
import ProductDto from '../dtos/product-dto.js';
import WarehouseDto from '../dtos/warehouse-dto.js';
import FullOrderDto from '../dtos/full-order-dto.js';

export default {
    // async getAllOrders(req, res) {
    //     const orders = await Order.findAll();
    //     const warehouses = await Warehouse.findAll({ where: { shopId: orders.shopId } });
    //     const ordersDtos = [];

    //     for (const order of orders) {
    //         ordersDtos.push(new OrderDto(order, warehouses));
    //     }

    //     res.json(ordersDtos);
    // },

    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll({
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['password', 'role', 'deletedAt', 'login', 'createdAt', 'updatedAt'],
                        },
                    },
                    {
                        model: Product,
                        through: ProductInOrder,
                    },
                ],
            });

            const ordersDtos = await Promise.all(
                orders.map(async order => {
                    const productInOrder = await ProductInOrder.findAll({ where: { orderId: order.id } });
                    const productIds = productInOrder.map(p => p.productId);
                    const products = await Product.findAll({ where: { id: productIds } });
                    const productDtos = products.map(product => new ProductDto(product));
                    return new FullOrderDto(order, order.User, productDtos);
                })
            );

            res.json(ordersDtos);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Failed to fetch orders' });
        }
    },

    // пофиксить проверку на достаточность товаров
    async createOrder({ body: { quantities, productIds, shopId, status, warehouseId, userId } }, res) {
        try {
            if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
                throw new Error('Product IDs not provided or invalid');
            }

            if (!quantities || !Array.isArray(quantities) || quantities.length !== productIds.length) {
                throw new Error('Product quantities not provided or invalid');
            }
            // Вычисляем суммарное количество товаров в заказе
            const totalQuantity = quantities.reduce((acc, quantity) => acc + quantity, 0);

            await Promise.all(
                productIds.map(async (productId, index) => {
                    const quantity = quantities[index];

                    // Проверяем на достаточность товара
                    const warehouse = await Warehouse.findOne({ where: { id: warehouseId } });
                    if (!warehouse) {
                        throw new Error('Warehouse not found for product');
                    }
                    const existProduct = await Product.findOne({
                        where: {
                            id: productId,
                            warehouseId: warehouse.id,
                        },
                    });

                    if (!existProduct) {
                        throw new Error('Product not found for product');
                    }

                    if (quantity >= existProduct.productQuantity) {
                        throw new Error(`Not enough quantity in the warehouse product SKU: ${existProduct.sku}`);
                    }
                })
            );
            console.log(warehouseId);
            // Создаем заказ
            const order = await Order.create({
                status,
                warehouseId,
                userId,
                // Добавляем суммарное количество в свойство quantity
                quantity: totalQuantity,
                shopId,
            });

            // Создаем записи в таблице ProductInOrder для связи заказа с товарами и их количеством
            await Promise.all(
                productIds.map(async (productId, index) => {
                    const quantity = quantities[index];

                    // Создаем запись в таблице ProductInOrder
                    await ProductInOrder.create({
                        orderId: order.id,
                        productId,
                        quantity,
                    });
                })
            );

            // Обновляем orderId для продуктов в таблице Product
            await Promise.all(
                productIds.map(async productId => {
                    await Product.update({ orderId: order.id }, { where: { id: productId } });
                })
            );

            // Обновляем количество товара на складе и в магазине
            await Promise.all(
                productIds.map(async (productId, index) => {
                    const quantity = quantities[index];

                    // Обновляем количество товара на складе (уменьшаем)
                    const warehouse = await Warehouse.findOne({ where: { id: warehouseId } });
                    await warehouse.decrement('quantity', { by: quantity });

                    // Увеличиваем количество товара в магазине
                    const shop = await Shop.findByPk(shopId);
                    if (!shop) {
                        throw new Error('Shop not found');
                    }
                    await shop.increment('quantity', { by: quantity });
                })
            );

            const orderProducts = await ProductInOrder.findAll({ where: { orderId: order.id } });

            const products = await Promise.all(
                orderProducts.map(async orderProducts => {
                    const product = await Product.findByPk(orderProducts.productId);
                    const productDto = new ProductDto(product);
                    return productDto;
                })
            );
            // Создаем DTO для заказа
            const orderData = {
                order: new OrderDto(order),
                products: products,
            };

            res.json(orderData);
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ error: 'Failed to create order', riason: error.message });
        }
    },

    async changeStatusOrder({ params: { orderId }, body: { status: newStatus, carrierId } }, res) {
        const order = await Order.findByPk(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        const carrier = await User.findByPk(carrierId);
        if (carrier.role !== roles.carrier) {
            throw new Error('Invalid carrier');
        }
        if (!newStatus || !Object.values(status).includes(newStatus)) {
            throw new Error('Invalid status');
        }
        if (newStatus !== status.delivered && newStatus !== status.delivering) {
            throw new Error('Invalid status');
        }

        // Теперь нужно в Product по айдишникам всех товаров в этом заказе обновить свойство warehouseId на null, а orderId у всех на новый
        await order.update({ status: newStatus, userId: carrierId });
        if (newStatus === status.delivering) {
            for (const productInOrder of await ProductInOrder.findAll({ where: { orderId } })) {
                const product = await Product.findByPk(productInOrder.productId);
                if (!product) {
                    throw new Error('Product not found');
                }
                await product.update({ warehouseId: null, shopId: order.shopId });
            }
        }

        res.json({ order });
    },
};
