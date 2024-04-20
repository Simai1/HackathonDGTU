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

export default {
    async getAllUserOrders(req, res) {
        const user = await User.findOne({ where: { id: req.user.id } });
        const orders = await Order.findAll({ where: { userId: user.id } });
        res.json({ orders });
    },

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

            // Создаем заказ
            const order = await Order.create({
                status,
                warehouseId,
                userId,
                // Первый элемент массива productIds будет использоваться в качестве productId
                productId: productIds[0],
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
                    if (!warehouse) {
                        throw new Error('Warehouse not found for product');
                    }

                    if (quantity > warehouse.quantity) {
                        throw new Error('Not enough quantity in the warehouse');
                    }
                    await warehouse.decrement('quantity', { by: quantity });

                    // Увеличиваем количество товара в магазине
                    const shop = await Shop.findByPk(shopId);
                    if (!shop) {
                        throw new Error('Shop not found');
                    }
                    await shop.increment('quantity', { by: quantity });
                })
            );

            // Создаем DTO для заказа
            const orderDto = new OrderDto(order);

            res.json({ order: orderDto });
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ error: 'Failed to create order' });
        }
    },

    async changeStatusOrder({ params: { orderId }, body: { status: newStatus, carrierId } }, res) {
        try {
            const order = await Order.findByPk(orderId);
            if (!order) {
                throw new Error('Order not found');
            }

            if (isNaN(newStatus) || !Object.values(status).includes(parseInt(newStatus))) {
                throw new Error('Invalid status');
            }

            await order.update({ status: parseInt(newStatus) });

            if (parseInt(newStatus) === status['Доставляется']) {
                const carrier = await User.findByPk(carrierId);
                if (!carrier) {
                    throw new Error('Carrier not found');
                }

                if (carrier.role !== roles['Поставщик']) {
                    throw new Error('The carrier must be a supplier');
                }

                // Присваиваем перевозчика заказу
                order.userId = carrier.id;

                // Обновляем поля warehouseId и shopId для каждого продукта этого заказа
                await Promise.all(
                    order.Products.map(async product => {
                        await product.update({ warehouseId: null, shopId: order.shopId });
                    })
                );
            }

            res.json({ message: 'Order status updated successfully' });
        } catch (error) {
            console.error('Error changing order status:', error);
            res.status(500).json({ error: 'Failed to change order status' });
        }
    },
};
