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
                shopId: {
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
                modelName: 'ProductInShop',
                tableName: 'productInShops',
                paranoid: true,
            }
        );
    }
}
