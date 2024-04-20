// import { models } from "./index.js";
// const { User } = models;
import Shop from './shop.js';
import Coords from './coords.js';
import Order from './order.js';
import Warehouse from './warehouse.js';
import Product from './product.js';

export default function () {
    // Shop oneToOne Coords
    Shop.hasOne(Coords);
    Coords.belongsTo(Shop);

    // Warehouse oneToOne Coords
    Warehouse.hasOne(Coords);
    Coords.belongsTo(Warehouse);

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
