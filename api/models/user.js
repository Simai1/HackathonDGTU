import { DataTypes, Model } from "sequelize";
import EnumRoles from '../config/roles.js';
import bcrypt from 'bcrypt';

export default class User extends Model {
    static initialize(sequelize) {
        User.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                login: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: 'login',
                    validate: { isEmail: { msg: 'Must be a valid email address' } },
                },
                role: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    validate: {
                        isIn: [Object.values(EnumRoles)],
                    },
                    defaultValue: EnumRoles.Администратор,
                },
                password: { type: DataTypes.STRING, allowNull: false },
                name: { type: DataTypes.STRING, allowNull: false },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'User',
                tableName: 'users',
                paranoid: true,
            }
        );

        function beforeCU(user){
            user.set('password', bcrypt.hashSync(user.password, bcrypt.genSaltSync()));
        }

        User.beforeCreate(beforeCU);
    }

    validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

