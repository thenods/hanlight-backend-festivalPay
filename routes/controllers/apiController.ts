import { Router } from "express";

// common 
import getStatus from "@Middleware/common/getStatus";

import adminController from "./admin.controller";

const router: Router = Router();

router.get('/status', getStatus);

router.use('/admin', adminController);

export default router;
