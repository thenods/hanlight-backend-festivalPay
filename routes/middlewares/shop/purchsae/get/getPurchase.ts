import { Request, Response, NextFunction } from "express";
import * as _ from 'lodash';

import Receipt from "@Model/receipt.model";
import ReceiptItem from "@Model/receiptItem.model";
import Shop from "@Model/shop.model";
import ShopItem from "@Model/shopItem.model";

import { HanlightUser } from "@Lib/types";
import CustomError from "@Middleware/error/customError";

interface ItemResponse {
  name: ShopItem['name'];
  count: ReceiptItem['count'];
  totalPrice: ReceiptItem['totalPrice'];
}

const getPurchase = async (req: Request, res: Response, next: NextFunction) => {
  const user: HanlightUser = res.locals.user;

  if (user.type !== 'student') {
    res.json({
      success: true,
      data: {
        items: [],
        totalPrice: 0,
      },
    });

    return;
  }

  try {
    const shop: Shop = await Shop.findOne({
      where: { className: `${user.major}${user.grade}-${user.classNum}`},
      include: [{
        model: ShopItem,
        include: [{
          model: ReceiptItem,
        }],
      }],
    });

    if (!shop) {
      next(new CustomError({ name: 'Not_Found' }));

      return;
    }

    const items: Array<ItemResponse> = _.map(shop.shopItem, item => ({
      name: item.name,
      count: _.sumBy(item.receiptItem, item => item.count),
      totalPrice: _.sumBy(item.receiptItem, item => item.totalPrice),
    }));

    console.log(5)

    res.json({
      success: true,
      data: {
        items,
        totalPrice: _.sumBy(items, item => item.totalPrice),
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getPurchase;
