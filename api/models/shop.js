import {DataTypes, Model} from "sequelize";

export default class Shop extends Model {
    static initialize(sequelize) {
        Shop.init(
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
                productID: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                warehouseID: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                coordsID: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },

            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Shop',
                tableName: 'shops',
                paranoid: true,
            }
        );
    }
}

