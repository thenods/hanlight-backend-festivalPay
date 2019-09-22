import { Router } from "express";

// common 
import getStatus from "@Middleware/common/getStatus";

const router: Router = Router();

router.get('/status', getStatus)

export default router;