import random from 'random';
import { AppErrorMissing } from '../utils/errors.js';
import Product from '../models/product.js';
import Shop from '../models/shop.js';
import Coord from '../models/coords.js';
import ShopDto from '../dtos/shop-dto.js';
import ProductDto from '../dtos/product-dto.js';

export default {
    async getAllShops(req, res) {
        const shops = await Shop.findAll({
            include: [
                {
                    model: Coord,
                },
            ],
        });
        const shopDtos = [];
        for (const shop of shops) {
            shopDtos.push(new ShopDto(shop));
        }
        res.json(shopDtos);
    },

    async getOneShopProducts({ params: { shopId } }, res) {
        if (!shopId) throw new AppErrorMissing('shopId');
        const shop = await Shop.findByPk(shopId, {
            include: [
                {
                    model: Coord,
                },
            ],
        });
        const products = await Product.findAll({ where: { shopId: shop.id } });
        const shopDto = new ShopDto(shop);
        const productDtos = [];
        for (const product of products) {
            productDtos.push(new ProductDto(product));
        }

        res.json({ ...shopDto, products: productDtos });
    },

    async deleteRandomProduct({ params: { shopId } }, res) {
        if (!shopId) throw new AppErrorMissing('shopId');
        const shop = await Shop.findByPk(shopId, {
            include: [
                {
                    model: Coord,
                },
            ],
        });
        const products = await Product.findAll({ where: { shopId: shop.id } });
        if (products.length <= 2) res.json('products <= 2');
        const product = products[random.int(0, products.length)];
        const productDto = new ProductDto(product);
        await product.destroy();
        shop.quantity -= product.productQuantity;
        shop.save();
        res.json(productDto);
    },
};
