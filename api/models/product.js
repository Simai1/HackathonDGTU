import { DataTypes, Model, Op } from 'sequelize';
import EnumProductMeasure from '../enums/measure.js';
// import EnumStoreName from '../enums/store-name.js';
import EnumProductsName from '../enums/product.js';
// import checkQuantity from '../utils/checkQuantity.js';
import createOrder from '../utils/createOrder.js';
import Warehouse from './warehouse.js';
import ShopInWarehouse from './shopInWarehouse.js';
import Shop from './shop.js';
export default class Product extends Model {
    static initialize(sequelize) {
        Product.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                productName: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    validate: {
                        isIn: [Object.values(EnumProductsName)],
                    },
                },
                productCost: {
                    type: DataTypes.REAL,
                    allowNull: false,
                },
                manufactureDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                expiryDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                // uploadingDate: {
                //     type: DataTypes.DATE,
                //     allowNull: false,
                // },
                sku: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                region: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                productAmount: {
                    type: DataTypes.REAL,
                    allowNull: false,
                },
                productMeasure: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    validate: {
                        isIn: [Object.values(EnumProductMeasure)],
                    },
                },
                productVolume: {
                    type: DataTypes.REAL,
                    allowNull: false,
                },
                manufacture: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                productQuantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                orderId: {
                    type: DataTypes.UUID,
                    allowNull: true,
                },
                warehouseId: {
                    type: DataTypes.UUID,
                    allowNull: true,
                },
                shopId: {
                    type: DataTypes.UUID,
                    allowNull: true,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Product',
                tableName: 'products',
                paranoid: true,
            }
        );

        Product.afterDestroy(async product => {
            // 1. Проверяем, если quantity меньше половины
            // if (product.quantity < 500) {
            // 2. Собираем все удаленные продукты по shop.id и записываем name продуктов в массив, id в другой массив
            const prod = await Product.findAll({
                limit: 5,
                where: {
                    deletedAt: {
                        [Op.ne]: null,
                    },
                    shopId: product.shopId,
                },
                paranoid: false,
            });
            const deletedNames = prod.map(prod => prod.productName);

            // По deletedNames найди такие же продукты ( с таким же названием) в складе, который связан с этим магазином, откуда товары удалялись

            const warehouse = await ShopInWarehouse.findOne({
                where: {
                    shopId: product.shopId,
                },
            });
            const productsInWarehouse = await Product.findAll({
                where: {
                    warehouseId: warehouse.warehouseId,
                    productName: deletedNames,
                },
            });
            const deletedProductsMap = new Map();

            for (const product of productsInWarehouse) {
                const key = product.productName;

                if (!deletedProductsMap.has(key)) {
                    deletedProductsMap.set(key, product.id);
                }
            }
            const productIds = [...deletedProductsMap.values()];
            // Получи для каждого productIds его productQuantities
            const quantities = await Promise.all(
                productIds.map(async productId => {
                    const product = await Product.findByPk(productId);
                    const prodQuan = product.productQuantity;
                    return prodQuan - 80;
                })
            );
            const shop = await ShopInWarehouse.findOne({
                where: {
                    shopId: product.shopId,
                },
            });
            const shopForProducty = await Shop.findByPk(shop.shopId);
            // 3. Создаем новый заказ
            if (shopForProducty.quantity - quantities.reduce((acc, val) => acc + val, 0) < 500) {
                // Создаем новый заказ для этих товаров
                await createOrder(quantities, productIds, product.shopId, warehouse.warehouseId);
            }
        });
    }
}
