import User from "../models/user.js";
import {AppErrorAlreadyExists, AppErrorInvalid, AppErrorMissing} from "../utils/errors.js";
import UserDto from '../dtos/user-dto.js';

export default {
    async register({body: {login, password, name}}, res) {
        if (!login) throw new AppErrorMissing("login");
        if (!password) throw new AppErrorMissing("password");
        if (!name) throw new AppErrorMissing('name');

        // if (name.length <= 3 || name.length >= 15) throw new AppErrorInvalid('name');
        // if (login.length <= 3) throw new AppErrorInvalid("login");
        // if (password.length <= 3) throw new AppErrorInvalid("password");

        const CheckUser = await User.findOne({where: {login}});
        if (CheckUser) throw new AppErrorAlreadyExists("user");

        const user = await User.create({
            login,
            password,
            name,
        });

        const userDto = new UserDto(user);
        res.json({
            'user': userDto,
        });
    },

    async login({body: {login, password}}, res) {
        if (!login) throw new AppErrorMissing("login");
        if (!password) throw new AppErrorMissing("password");

        const user = await User.findOne({where: {login}});
        if (!user || !user.validatePassword(password)) throw new AppErrorInvalid("login or password");
        if (!user) throw new AppErrorInvalid("login or password");

        const userDto = new UserDto(user);

        res.json({
            'user': userDto,
        });
    },

    // async logout(req, res) {
    //     const {refreshToken} = req.cookies;
    //     await jwt.removeToken(refreshToken);
    //     res.clearCookie('refreshToken');
    //     res.json({status: 'OK'});
    // },

    async getUsers(req, res) {
        const users = await User.findAll();
        const userDtos = [];
        for (const user of users) {
            userDtos.push(new UserDto(user));
        }
        res.json({userDtos});
    },
}
