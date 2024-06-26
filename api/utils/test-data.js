import testData from '../config/test-data.js';
import Warehouse from '../models/warehouse.js';
import Coord from "../models/coords.js";
import Shop from "../models/shop.js";
import User from "../models/user.js";
import ShopInWarehouse from "../models/shopInWarehouse.js";
import Product from "../models/product.js";
import EnumProductMeasure from '../enums/measure.js';
import EnumProductsName from '../enums/product.js';

async function fillWarehouse() {
    for (let i = 0; i < 3; i++) {
        const shop = await Shop.findOne({
            where: {
                name: testData.shop[i].name,
            },
        });
        if (!shop) {
            const coord1 = await Coord.create({
                coordsX: 39.733434772582854,
                coordsY: 47.15389020591696,
                iconCaption: testData.shop[i].name,
                markerColor: "#1e98ff",
            });
            const newShop = await Shop.create({
                name: testData.shop[i].name,
                quantity: testData.shop[i].quantity,
                coordId: coord1.id,
            });
            for (const product of testData.shop[i].products) {
                await Product.create({
                    productName: EnumProductsName[product.Product_Name],
                    productCost: product.Product_Cost,
                    manufactureDate: product.Manufacture_Date,
                    expiryDate: product.Expiry_Date,
                    sku: product.SKU,
                    region: product.Region,
                    productAmount: product.Product_Amount,
                    productMeasure: EnumProductMeasure[product.Product_Measure],
                    productVolume: product.Product_Volume,
                    manufacture: product.Manufacturer,
                    productQuantity: product.Product_Quantity,
                    shopId: newShop.id,
                })
            }
            const coord2 = await Coord.create({
                coordsX: 39.733434772582854,
                coordsY: 47.15389020591696,
                iconCaption: testData.warehouse[i].name,
                markerColor: "#1e98ff",
            });
            const newWarehouse = await Warehouse.create({
                name: testData.warehouse[i].name,
                quantity: testData.warehouse[i].quantity,
                coordId: coord2.id,
            });
            for (const warehouse of testData.warehouse[i].products) {
                await Product.create({
                    productName: EnumProductsName[warehouse.Product_Name],
                    productCost: warehouse.Product_Cost,
                    manufactureDate: warehouse.Manufacture_Date,
                    expiryDate: warehouse.Expiry_Date,
                    sku: warehouse.SKU,
                    region: warehouse.Region,
                    productAmount: warehouse.Product_Amount,
                    productMeasure: EnumProductMeasure[warehouse.Product_Measure],
                    productVolume: warehouse.Product_Volume,
                    manufacture: warehouse.Manufacturer,
                    productQuantity: warehouse.Product_Quantity,
                    warehouseId: newWarehouse.id,
                })
            }
            await ShopInWarehouse.create({
                shopId: newShop.id,
                warehouseId: newWarehouse.id,
            })
        }
    }
    const user = await User.findOne({
        where: {
            login: "admin@mail.com",
        },
    });
    if (!user) {
        await User.create({
            login: "admin@mail.com",
            password: "123321",
            name: "Иван Иванов",
        })
    }
}

export default {
    fillWarehouse,
};
