import { DataTypes, Model } from 'sequelize';

export default class ProductInOrder extends Model {
    static initialize(sequelize) {
        ProductInOrder.init(
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
                orderId: {
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
                modelName: 'ProductInOrder',
                tableName: 'productInOrders',
                paranoid: true,
            }
        );
    }
}
