import { ValidationChain, body } from "express-validator";
import Receipt from "@Model/receipt.model";

export interface PostReceiptCancelRequest {
  body: {
    receipt_pk: Receipt['pk'];
  }
}

const postReceiptCancelValidation: ValidationChain[] = [
  body('receipt_pk').isInt(),
];

export default postReceiptCancelValidation;
