import Order from '../models/order.js';
import User from '../models/user.js';
import OrderDto from '../dtos/order-dto.js';
import status from '../enums/status.js';
import roles from '../config/roles.js';
import ProductInOrder from '../models/productInOrder.js';
import Warehouse from '../models/warehouse.js';
import Shop from '../models/shop.js';

export default {
    async getAllUserOrders(req, res) {
        const user = await User.findOne({ where: { id: req.user.id } });
        const orders = await Order.findAll({ where: { userId: user.id } });
        res.json({ orders });
    },

    async createOrder(req, res) {
        try {
            const { quantities, productIds, shopId, ...orderData } = req.body;

            if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
                throw new Error('Product IDs not provided or invalid');
            }

            if (!quantities || !Array.isArray(quantities) || quantities.length !== productIds.length) {
                throw new Error('Product quantities not provided or invalid');
            }

            // Вычисляем суммарное количество товаров в заказе
            const totalQuantity = quantities.reduce((acc, quantity) => acc + quantity, 0);

            // Добавляем суммарное количество в свойство quantity объекта orderData
            orderData.quantity = totalQuantity;

            // Создаем заказ
            const order = await Order.create(orderData);

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

                    // Обновляем количество товара на складе (уменьшаем)
                    const warehouse = await Warehouse.findOne({ where: { productId } });
                    if (!warehouse) {
                        throw new Error('Warehouse not found for product');
                    }
                    await warehouse.decrement('quantity', { by: quantity });

                    // Увеличиваем количество товара в магазине
                    const shop = await Shop.findByPk(shopId);
                    if (!shop) {
                        throw new Error('Shop not found');
                    }
                    await shop.increment(['productQuantities', productId], { by: quantity });
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

            if (!Object.values(status).includes(newStatus)) {
                throw new Error('Invalid status');
            }

            await order.update({ status: newStatus });

            // Если новый статус равен 1 (Доставляется), присваиваем заказу перевозчика
            if (newStatus === status['Доставляется']) {
                // Проверяем, что перевозчик с указанным идентификатором существует
                const carrier = await User.findByPk(carrierId);
                if (!carrier) {
                    throw new Error('Carrier not found');
                }

                // Проверяем, что перевозчик является поставщиком
                if (carrier.role !== roles['Поставщик']) {
                    throw new Error('The carrier must be a supplier');
                }

                // Присваиваем перевозчика заказу
                order.userId = carrier.id;
                await order.save();
            }

            res.json({ message: 'Order status updated successfully' });
        } catch (error) {
            console.error('Error changing order status:', error);
            res.status(500).json({ error: 'Failed to change order status' });
        }
    },
};
