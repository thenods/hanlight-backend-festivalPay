import { Router } from "express";

import checkAdmin from "@Middleware/admin/checkAdmin";
import verifyToken from "@Middleware/common/verifyToken";

const adminController: Router = Router();

adminController.get('/', verifyToken, checkAdmin('response'));

export default adminController;
