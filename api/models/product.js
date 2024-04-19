import {DataTypes, Model} from "sequelize";

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
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                count: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                expiryDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                manufactureDate: {
                    type: DataTypes.DATE,
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

