import { DataTypes, Model } from 'sequelize';

export default class Order extends Model {
    static initialize(sequelize) {
        Order.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                from: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                to: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                warehouseId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                productId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Order',
                tableName: 'orders',
                paranoid: true,
            }
        );
    }
}
