import { ValidationChain, body } from "express-validator";
import { RequestHeaderWithToken } from "@Lib/types";

export type PostMoneyParams = {
  body: {
    user_pk: string;
    amount: number;
  }
} & RequestHeaderWithToken;

const postMoneyValidation: ValidationChain[] = [
  body('user_pk').isUUID(),
  body('amount').isInt({ min: 0 }),
];

export default postMoneyValidation;
