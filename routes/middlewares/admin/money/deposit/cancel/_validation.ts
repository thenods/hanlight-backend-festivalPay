import { ValidationChain, body } from "express-validator";

import Charge from "@Model/charge.model";

export interface CancelDepositRequest {
  body: {
    charge_pk: Charge['pk'];
  };
}

const cancelDepositValidation: ValidationChain[] = [
  body('charge_pk').isInt(),
];

export default cancelDepositValidation;
