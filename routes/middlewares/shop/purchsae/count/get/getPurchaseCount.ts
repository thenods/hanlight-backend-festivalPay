import { Request, Response, NextFunction } from "express";
import * as _ from 'lodash';

import CustomError from "@Middleware/error/customError";

import { HanlightUser } from "@Lib/types";

import Receipt from "@Model/receipt.model"

const getPurhcaseCount = async (req: Request, res: Response, next: NextFunction) => {
  const user: HanlightUser = res.locals.user;

  try {
    const receipts: Receipt[] = await Receipt.findAll({ where: { user_pk: user.pk, confirm: true } });

    const uniqReceipts: Receipt[] = _.uniqBy(receipts, receipt => receipt.shop_pk);

    res.json({
      success: true,
      data: {
        purchaseCount: uniqReceipts.length,
      },
    });

  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getPurhcaseCount;
