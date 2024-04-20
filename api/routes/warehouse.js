import { Router } from "express";
import warehouseController from "../controllers/warehouse.js";
import {asyncRoute} from "../utils/errors.js";

const router = Router();

router.get('/', asyncRoute(warehouseController.getAllWarehouses));
router.get('/:warehouseId/products', asyncRoute(warehouseController.getOneWarehouseProducts))

export default router;
