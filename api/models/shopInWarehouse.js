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
                shopId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                warehouseId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'ShopInWarehouse',
                tableName: 'shopInWarehouses',
                paranoid: true,
            }
        );
    }
}
