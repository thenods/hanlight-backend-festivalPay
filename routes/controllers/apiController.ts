import { Router } from "express";

// common 
import getStatus from "@Middleware/common/getStatus";

import adminController from "./admin.controller";
import shopController from "./shop.controller";
import userController from "./user.controller";

const router: Router = Router();

router.get('/status', getStatus);

router.use('/user', userController);
router.use('/admin', adminController);
router.use('/shop', shopController);

export default router;
