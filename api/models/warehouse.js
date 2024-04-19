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

