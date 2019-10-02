import { Router } from "express";

import getAdmin from "@Middleware/admin/get/getAdmin";
import verifyToken from "@Middleware/common/verifyToken";

const adminController: Router = Router();

adminController.get('/', verifyToken, getAdmin)

// common, validation
import checkAdmin from "@Middleware/admin/checkAdmin";
import verifyToken from "@Middleware/common/verifyToken";
import postMoneyValidation from "@Middleware/admin/money/post/_validation";
import approveDepositValidation from "@Middleware/admin/money/deposit/approve/_validation";
import cancelDepositValidation from "@Middleware/admin/money/deposit/cancel/_validation";
import checkValidation from "@Middleware/common/checkValidation";

// Post Money
import getUserWithUUID from "@Middleware/admin/money/post/getUserWithUUID";
import postMoney from "@Middleware/admin/money/post/postMoney";

// Deposit
import getDepositList from "@Middleware/admin/money/deposit/list/getDepositList";
import approveDeposit from "@Middleware/admin/money/deposit/approve/approveDeposit";
import cancelDeposit from "@Middleware/admin/money/deposit/cancel/cancelDeposit";

const adminController: Router = Router();

adminController.get('/', verifyToken, checkAdmin('response'));

adminController.use(verifyToken, checkAdmin('middleware'));

adminController.post('/money', postMoneyValidation);
adminController.post('/money/deposit/approve', approveDepositValidation);
adminController.post('/money/deposit/cancel', cancelDepositValidation);

adminController.use(checkValidation);

adminController.post('/money', getUserWithUUID, postMoney);
adminController.get('/money/deposit/list', getDepositList);
adminController.post('/money/deposit/approve', approveDeposit);
adminController.post('/money/deposit/cancel', cancelDeposit);

export default adminController;
