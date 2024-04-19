import {DataTypes, Model} from "sequelize";

export default class Warehouse extends Model {
    static initialize(sequelize) {
        Warehouse.init(
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
                coordsID: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                shopID: {
                    type: DataTypes.UUID,
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
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Warehouse',
                tableName: 'warehouses',
                paranoid: true,
            }
        );
    }
}

