import { DataTypes, Model } from 'sequelize';

export default class ShopInWarehouse extends Model {
    static initialize(sequelize) {
        ShopInWarehouse.init(
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
                modelName: 'ShopInWarehouse',
                tableName: 'shopInWarehouse',
                paranoid: true,
            }
        );
    }
}
