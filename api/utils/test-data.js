import testData from '../config/test-data.js';
import Warehouse from '../models/warehouse.js';
import Coord from "../models/coords.js";
import Shop from "../models/shop.js";
import User from "../models/user.js";
import ShopInWarehouse from "../models/shopInWarehouse.js";

async function fillWarehouse() {
    for (let i = 0; i<3; i++) {
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
            const coord2 = await Coord.create({
                coordsX: 39.733434772582854,
                coordsY: 47.15389020591696,
                iconCaption: testData.warehouse[i].name,
                markerColor: "#1e98ff",
            });
            const warehouse = await Warehouse.create({
                name: testData.warehouse[i].name,
                quantity: testData.warehouse[i].quantity,
                coordId: coord2.id,
            });
            await ShopInWarehouse.create({
                shopId: newShop.id,
                warehouseId: warehouse.id,
            })
        }
    }
    const user = await User.findOne({
        where: {
            login: "admin@mail.com",
        },
    });
    if (!user){
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
