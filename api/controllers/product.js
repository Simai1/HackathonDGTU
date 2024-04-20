import Product from '../models/product';
import Shop from '../models/shop';
import Warehouse from '../models/warehouse';

export default {
    async getProducts(req, res) {
        const products = await Product.findAll({ include: [Shop, Warehouse] });
        res.json(products);
    },

    async createProduct(req, res)
};
