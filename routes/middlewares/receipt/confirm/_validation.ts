import { ValidationChain, body } from "express-validator";

import Receipt from "@Model/receipt.model";

export interface PostReceiptConfirmRequest {
  body: {
    receipt_pk: Receipt['pk'];
  }
}

const postReceiptConfirmValidation: ValidationChain[] = [
  body('receipt_pk').isInt(),
];

export default postReceiptConfirmValidation;
