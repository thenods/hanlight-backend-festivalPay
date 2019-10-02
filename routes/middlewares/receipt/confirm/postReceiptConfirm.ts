import { Request, Response, NextFunction } from "express";
import { sequelize } from "@Database/index";

import CustomError from "@Middleware/error/customError";

import { HanlightUser } from "@Lib/types";

import Receipt from "@Model/receipt.model";

import { PostReceiptConfirmRequest } from "./_validation";
import { Transaction } from "sequelize";

const postReceiptConfirm = (req: Request, res: Response, next: NextFunction) => {
  const user: HanlightUser = res.locals.user;
  const { receipt_pk }: PostReceiptConfirmRequest['body'] = req.body;
  
  sequelize.transaction({ autocommit: false })
    .then(async (t: Transaction) => {
      try {
        const receipt: Receipt = await Receipt.findOne({
          where: { pk: receipt_pk, user_pk: user.pk, confirm: false, cancel: false },
          transaction: t,
          lock: Transaction.LOCK.UPDATE,
        });

        if (!receipt) {
          next(new CustomError({ name: 'Wrong_Data' }));
          await t.commit();

          return;
        }

        receipt.confirm = true;
        await receipt.save({ transaction: t });

        await t.commit();

        res.json({
          success: true,
          data: {
            receipt,
          },
        });
      } catch (error) {
        console.log(error)
        await t.rollback();
        next(new CustomError({ name: 'Database_Error' }));
      }
    })
};

export default postReceiptConfirm;
