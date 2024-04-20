import { DataTypes, Model } from 'sequelize';
import EnumProductMeasure from '../enums/measure.js';
// import EnumStoreName from '../enums/store-name.js';
import EnumProductsName from '../enums/product.js';
// import checkQuantity from '../utils/checkQuantity.js';

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
        // Product.afterDestroy(async shop => {
        //     await checkQuantity(shop);
        // });
    }
}
