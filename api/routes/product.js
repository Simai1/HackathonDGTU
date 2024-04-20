import { Router } from 'express';
import productController from '../controllers/product.js';
import { asyncRoute } from '../utils/errors.js';

const router = Router();

router.get('/getAllProducts', asyncRoute(productController.getProductsWithWarehouse));
router.get('/getExpiryProducts', asyncRoute(productController.getExpiryDateProduct));
router.delete('/:shopId', asyncRoute(productController.deleteRandomProduct));
// router.route('/:shopId').delete(asyncRoute(productController.deleteRandomProduct));
export default router;
