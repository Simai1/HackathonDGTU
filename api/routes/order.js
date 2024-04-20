import { Router } from 'express';
import orderController from '../controllers/order.js';
import { asyncRoute } from '../utils/errors.js';

const router = Router();

router.post('/addProduct');
router.get('/getProductByWarehouse');
router.get('/getProductByShop');
router.delete('/deleteProduct');

router.post('/changeStatusOrder/:orderId', asyncRoute(orderController.changeStatusOrder));
router.post('/createOrder', asyncRoute(orderController.createOrder));
router.get('/getAllOrders', asyncRoute(orderController.getAllOrders));

export default router;
