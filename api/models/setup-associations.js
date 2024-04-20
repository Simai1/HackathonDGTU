// import { models } from "./index.js";
// const { User } = models;
import Shop from './shop.js';
import Coords from './coords.js';
import Order from './order.js';
import Warehouse from './warehouse.js';
import Product from './product.js';

export default function () {
    // Shop oneToOne Coords
    Coords.hasOne(Shop);
    Shop.belongsTo(Coords);

    // Warehouse oneToOne Coords
    Coords.hasOne(Warehouse);
    Warehouse.belongsTo(Coords);

    // Shop OneToMany Product
    Shop.hasMany(Product);
    Product.belongsTo(Shop);

    // Warehouse OneToMany Product
    Warehouse.hasMany(Product);
    Product.belongsTo(Warehouse);

    // Product ManyToMany Order
    Product.belongsToMany(Order, { through: 'ProductInOrder' });
    Order.belongsToMany(Product, { through: 'ProductInOrder' });
}
