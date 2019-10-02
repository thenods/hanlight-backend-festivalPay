import { Request, Response, NextFunction } from "express";

import ReceiptItem from "@Model/receiptItem.model";
import Receipt from "@Model/receipt.model";

import CustomError from "@Middleware/error/customError";

import { HanlightUser } from "@Lib/types";

const getReceipt = async (req: Request, res: Response, next: NextFunction) => {
  const user: HanlightUser = res.locals.user;

  try {
    
    const receipts: Receipt[] = await Receipt.findAll({
      where: { user_pk: user.pk },
      include: [{
        model: ReceiptItem,
      }],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: {
        receipt: receipts.map(receipt => ({
          pk: receipt.pk,
          shop_name: receipt.shop_name,
          moneyAfter: receipt.moneyAfter,
          moneyBefore: receipt.moneyBefore,
          confirm: receipt.confirm,
          cancel: receipt.cancel,
          price: receipt.price,
          receiptItem: receipt.receiptItem.map(item => ({
            name: item.name,
            count: item.count,
            totalPrice: item.totalPrice,
          })),
          createdAt: receipt.createdAt,
        })),
      },
    });

  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }

  
};

export default getReceipt;
