import {AppErrorMissing} from "../utils/errors.js";
import Product from "../models/product.js";
import Shop from "../models/shop.js";

export default {
    async getAllShops(req, res) {
        const shops = await Shop.findAll();
        res.json(shops);
    },

    async getOneShopProducts({params: {shopId}}, res) {
        if (!shopId) throw new AppErrorMissing('shopId');
        const shop = await Shop.findByPk(shopId, {
            include: [
                {
                    model: Product
                }
            ]
        });

        res.json({shop});
    }
}
