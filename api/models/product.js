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
                SKU: {
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
                productQuantity:{
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                orderId: {
                    type: DataTypes.UUID,
                    allowNull: true,
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
