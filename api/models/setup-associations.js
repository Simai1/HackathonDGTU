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

    Product.belongsToMany(Shop, { through: 'ProductInShop', foreignKey: 'productID' });
    Shop.belongsToMany(Product, { through: 'ProductInShop', foreignKey: 'shopID' });

    Shop.belongsToMany(Warehouse, { through: 'ShopInWarehouse', foreignKey: 'shopID' });
    Warehouse.belongsToMany(Shop, { through: 'ShopInWarehouse', foreignKey: 'warehouseID' });

    Product.belongsToMany(Order, { through: 'ProductInOrder', foreignKey: 'productID' });
    Order.belongsToMany(Product, { through: 'ProductInOrder', foreignKey: 'orderID' });

    Product.belongsToMany(Warehouse, { through: 'ProductInWarehouse', foreignKey: 'productID' });
    Warehouse.belongsToMany(Product, { through: 'ProductInWarehouse', foreignKey: 'warehouseID' });
}
