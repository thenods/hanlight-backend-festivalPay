import { Router } from "express";

import verifyToken from "@Middleware/common/verifyToken";

import getReceipt from "@Middleware/receipt/get/getReceipt";
import postReceiptConfirm from "@Middleware/receipt/confirm/postReceiptConfirm";
import postReceiptConfirmValidation from "@Middleware/receipt/confirm/_validation";
import checkValidation from "@Middleware/common/checkValidation";
import postReceiptCancelValidation from "@Middleware/receipt/cancel/_validation";
import postReceiptCancel from '@Middleware/receipt/cancel/postReceiptCancel';

const receiptController: Router = Router();

receiptController.use(verifyToken);

receiptController.post('/confirm', postReceiptConfirmValidation);
receiptController.post('/cancel', postReceiptCancelValidation);

receiptController.use(checkValidation);

receiptController.get('/', getReceipt);
receiptController.post('/confirm', postReceiptConfirm);
receiptController.post('/cancel', postReceiptCancel);

export default receiptController;
