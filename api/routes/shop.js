import { Router } from "express";
import shopController from "../controllers/shop.js";
import {asyncRoute} from "../utils/errors.js";

const router = Router();

router.get('/', asyncRoute(shopController.getAllShops))
router.get('/:shopId/products', asyncRoute(shopController.getOneShopProducts));

export default router;
