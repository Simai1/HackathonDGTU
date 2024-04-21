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

    async changeStatusOrder({ params: { orderId }, body: { status: newStatus, carrierId } }, res) {
        const order = await Order.findByPk(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        const carrier = await User.findByPk(carrierId);
        if (carrier.role !== roles.Поставщик) {
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
