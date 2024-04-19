import { DataTypes, Model } from 'sequelize';

export default class ProductInWarehouse extends Model {
    static initialize(sequelize) {
        ProductInWarehouse.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'ProductInWarehouse',
                tableName: 'productInWarehouse',
                paranoid: true,
            }
        );
    }
}
