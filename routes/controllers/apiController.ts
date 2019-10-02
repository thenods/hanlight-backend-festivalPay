import { Router } from "express";

// common 
import getStatus from "@Middleware/common/getStatus";

import adminController from "./admin.controller";

import shopController from "./shop.controller";
import userController from "./user.controller";
import receiptController from "./receipt.controller";

const router: Router = Router();

router.get('/status', getStatus);

router.use('/admin', adminController);

router.use('/user', userController);
router.use('/admin', adminController);
router.use('/shop', shopController);
router.use('/receipt', receiptController);

export default router;
