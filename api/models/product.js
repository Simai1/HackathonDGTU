import { DataTypes, Model } from 'sequelize';
import EnumProductMeasure from '../enums/measure.js';
import EnumStoreName from '../enums/store-name.js';
import EnumProductsName from '../enums/product.js';

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
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        isIn: [Object.values(EnumProductsName)],
                    },
                },
                productCost: {
                    type: DataTypes.INTEGER,
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
                SKU: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                storeName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        isIn: [Object.values(EnumStoreName)],
                    },
                },
                storeAddress: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                region: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                saleDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                quantitySold: {
                    type: DataTypes.REAL,
                    allowNull: false,
                },
                productMeasure: {
                    type: DataTypes.STRING,
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
                orderId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                warehouseId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                shopId: {
                    type: DataTypes.UUID,
                    allowNull: false,
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
    }
}
