import Order from '../models/order';
import User from '../models/user';

export default {
    async getAllUserOrders(req, res) {
        const user = await User.findOne({ where: { id: req.user.id } });
        const orders = await Order.findAll({ where: { userId: user.id } });
        res.json({ orders });
    },
};
