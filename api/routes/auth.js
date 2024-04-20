import { Router } from "express";
import authController from "../controllers/auth.js";
import {asyncRoute} from "../utils/errors.js";

const router = Router();

router.post('/login', asyncRoute(authController.login));
router.post('/register', asyncRoute(authController.register));
// router.post('/logout', asyncRoute(authController.logout));
router.get('/users', asyncRoute(authController.getUsers));
router.get('/test', asyncRoute(authController.test));

export default router;
