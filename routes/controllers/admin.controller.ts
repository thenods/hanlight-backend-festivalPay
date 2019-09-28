import { Router } from "express";

import getAdmin from "@Middleware/admin/get/getAdmin";
import verifyToken from "@Middleware/common/verifyToken";

const adminController: Router = Router();

adminController.get('/', verifyToken, getAdmin)

export default adminController;
