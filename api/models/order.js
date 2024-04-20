import { DataTypes, Model } from 'sequelize';
import EnumStatus from '../enums/status.js';

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
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    defaultValue: 0,
                    validate: {
                        isIn: [Object.values(EnumStatus)],
                    },
                },
                warehouseId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                productId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                userId: {
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
                modelName: 'Order',
                tableName: 'orders',
                paranoid: true,
            }
        );
    }
}
