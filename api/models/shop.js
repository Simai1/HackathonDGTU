import { DataTypes, Model } from 'sequelize';

export default class Shop extends Model {
    static initialize(sequelize) {
        Shop.init(
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
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 1000,
                },
                coordId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Shop',
                tableName: 'shops',
                paranoid: true,
            }
        );
    }
}
