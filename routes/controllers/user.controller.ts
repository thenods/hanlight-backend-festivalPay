import { Router } from "express";

import verifyToken from "@Middleware/common/verifyToken";

import getMoney from "@Middleware/user/money/getMoney";

const userController: Router = Router();

userController.use(verifyToken);

userController.get('/money', getMoney);

export default userController;
