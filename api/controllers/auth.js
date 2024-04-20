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

    async login(req, res) {
        if (!req.body.login) throw new AppErrorMissing("login");
        if (!req.body.password) throw new AppErrorMissing("password");

        const user = await User.findOne({where: {login: req.body.login}});
        if (!user || !user.validatePassword(req.body.password)) throw new AppErrorInvalid("login or password");
        if (!user) throw new AppErrorInvalid("login or password");

        const userDto = new UserDto(user);
        console.log("success login")
        res.json({
            'user': userDto,
        });
    },

    async test(req, res){
        // await Coord.create({
        //     coordsX: 39.733434772582854,
        //     coordsY: 47.15389020591696,
        //     iconCaption: "Склад 1",
        //     markerColor: "#1e98ff"
        //     }
        // );
        // await Coord.create({
        //         coordsX: 39.66504917153893,
        //         coordsY: 47.27843879132772,
        //         iconCaption: "Магазин 1",
        //         markerColor: "#1e98ff"
        //     }
        // );
        // await Shop.create({
        //     name: 'Магазин 1',
        //     quantity: 50,
        //     coordsId: 'fb7ad6b2-03a2-4661-af33-b1b74b3b2d9d',
        // })
        // await Warehouse.create({
        //     name: 'Склад 1',
        //     coordsId: 'f20a2fb1-3d8c-44e0-8a65-1b895ead9bc0',
        //     shopId: '86c15d41-81e5-42e7-be76-de6c306767e6',
        //     quantity: 50
        // })
        await

        res.json('ok');
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
        console.log(req.session)
        res.json({userDtos});
    },
}
