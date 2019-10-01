import { Request, Response, NextFunction } from "express";
import { Transaction } from "sequelize";

import Receipt from "@Model/receipt.model";
import User from "@Model/user.model";
import { sequelize } from "@Database/index";

import { HanlightUser } from "@Lib/types";
import { PostReceiptCancelRequest } from "./_validation";

import CustomError from "@Middleware/error/customError";

const postReceiptCancel = async (req: Request, res: Response, next: NextFunction) => {
  const user: HanlightUser = res.locals.user;
  const { receipt_pk }: PostReceiptCancelRequest['body'] = req.body;

  try {
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

        receipt.cancel = true;
        await receipt.save({ transaction: t });

        const currentUser: User = await User.findOne({ where: { pk: user.pk }, transaction: t });

        currentUser.money += receipt.price;
        await currentUser.save({ transaction: t });

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
  } catch (error) {
    
  }
};

export default postReceiptCancel;
