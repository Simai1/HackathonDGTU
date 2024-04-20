// import { models } from "./index.js";
// const { User } = models;
import Shop from './shop.js';
import Coords from './coords.js';
import Order from './order.js';
import Warehouse from './warehouse.js';
import Product from './product.js';
import User from './user.js';

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

    //
    Shop.hasMany(Order);
    Order.belongsTo(Shop);

    // Warehouse OneToMany Product
    Warehouse.hasMany(Product);
    Product.belongsTo(Warehouse);

    User.hasMany(Order);
    Order.belongsTo(User);

    // Product ManyToMany Order
    Product.belongsToMany(Order, { through: 'ProductInOrder' });
    Order.belongsToMany(Product, { through: 'ProductInOrder' });
}
