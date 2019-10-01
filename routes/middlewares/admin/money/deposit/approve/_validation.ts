import { ValidationChain, body } from "express-validator";

import Charge from "@Model/charge.model";

export interface ApproveDepositRequest {
  body: {
    charge_pk: Charge['pk'];
  };
}

const approveDepositValidation: ValidationChain[] = [
  body('charge_pk').isInt(),
];

export default approveDepositValidation;
