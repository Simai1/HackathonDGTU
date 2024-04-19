// import { models } from "./index.js";
// const { User } = models;
import Shop from './shop.js';
import Coords from './coords.js';
import Order from './order.js';
import Warehouse from './warehouse.js';
import Product from './product.js';

export default function () {
    // User.hasOne(TokenSchema, { foreignKey: 'userId' });
    // TokenSchema.belongsTo(User, { foreignKey: 'userId' });

    Shop.hasOne(Coords);
    Coords.belongsTo(Shop);

    Warehouse.hasOne(Coords);
    Coords.belongsTo(Warehouse);

    Product.belongsToMany(Shop, { through: 'ProductInShop', foreignKey: 'productId' });
    Shop.belongsToMany(Product, { through: 'ProductInShop', foreignKey: 'shopId' });

    Shop.belongsToMany(Warehouse, { through: 'ShopInWarehouse', foreignKey: 'shopId' });
    Warehouse.belongsToMany(Shop, { through: 'ShopInWarehouse', foreignKey: 'warehouseId' });

    Product.belongsToMany(Order, { through: 'ProductInOrder', foreignKey: 'productId' });
    Order.belongsToMany(Product, { through: 'ProductInOrder', foreignKey: 'orderId' });

    Product.belongsToMany(Warehouse, { through: 'ProductInWarehouse', foreignKey: 'productId' });
    Warehouse.belongsToMany(Product, { through: 'ProductInWarehouse', foreignKey: 'warehouseId' });
}
