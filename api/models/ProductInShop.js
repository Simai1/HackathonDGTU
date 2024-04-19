import { DataTypes, Model } from 'sequelize';

export default class ProductInShop extends Model {
    static initialize(sequelize) {
        ProductInShop.init(
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
                modelName: 'ProductInShop',
                tableName: 'productInShop',
                paranoid: true,
            }
        );
    }
}
