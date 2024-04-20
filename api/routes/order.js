import { Router } from 'express';
import orderController from '../controllers/order.js';
import { asyncRoute } from '../utils/errors';

const router = Router();

router.post('/addProduct');
router.get('/getProductByWarehouse');
router.get('/getProductByShop');
router.delete('/deleteProduct');

router.post('/changeStatusOrder', asyncRoute(orderController.changeStatusOrder));
router.post('/createOrder', asyncRoute(orderController.createOrder));

export default router;
