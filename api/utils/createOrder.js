import Order from '../models/order.js';
import Warehouse from '../models/warehouse.js';
import Product from '../models/product.js';
import ProductInOrder from '../models/productInOrder.js';
import Shop from '../models/shop.js';
import OrderDto from '../dtos/order-dto.js';
import ProductDto from '../dtos/product-dto.js';
import ProductInWarehouse from '../models/ProductInWarehouse.js';
export default async function createOrder(quantities, productIds, shopId, warehouseId) {
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
        // Создаем заказ
        const order = await Order.create({
            warehouseId,
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

        return orderData;
    } catch (error) {
        console.error('Error creating order:', error);
    }
}
