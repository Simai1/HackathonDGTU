import { DataTypes, Model } from 'sequelize';

export default class ProductIOrder extends Model {
    static initialize(sequelize) {
        ProductIOrder.init(
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
                modelName: 'ProductIOrder',
                tableName: 'productIOrder',
                paranoid: true,
            }
        );
    }
}
