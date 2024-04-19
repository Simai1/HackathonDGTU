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
                productId: {
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
                modelName: 'ProductInWarehouse',
                tableName: 'productInWarehouses',
                paranoid: true,
            }
        );
    }
}
