import { Request, Response, NextFunction } from "express";
import { sequelize } from "database";
import * as _ from 'lodash';
import { Transaction } from 'sequelize';

import User from "@Model/user.model";
import Shop from "@Model/shop.model";
import ShopItem from "@Model/shopItem.model";
import Receipt from "@Model/receipt.model";
import ReceiptItem from "@Model/receiptItem.model";

import CustomError from "@Middleware/error/customError";

import { PostPurchaseRequest } from "./_validation";

interface Item {
  pk: ShopItem['pk'];
  name: ShopItem['name'];
  price: ShopItem['price']
  count: ReceiptItem['count'];
  totalPrice: ReceiptItem['totalPrice'];
}

const postPurchase = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const { shop_pk, items }: PostPurchaseRequest['body'] = req.body;

  const itemsPk: Array<number> = _.map(items, (item) => item.pk);

  const shop: Shop = await Shop.findOne({
    where: { pk: shop_pk }
  });

  const shopItems: Array<ShopItem> = await ShopItem.findAll({
    where: { pk: itemsPk },
  });

  if (shopItems.length !== items.length) {
    next(new CustomError({ name: 'Wrong_Data', message: '여러 다른 부스 상품들을 1번에 요청하셨거나 없는 상품을 요청하셨습니다.' }));

    return;
  }

  let moneyToPay: number = 0;

  const itemsToPay: Item[] = _.map(shopItems, shopItem => {
    const item = _.find(items, item => item.pk === shopItem.pk);

    const totalPrice = shopItem.price * item.count;
    moneyToPay += totalPrice;

    return ({
      pk: shopItem.pk,
      name: shopItem.name,
      price: shopItem.price,
      count: item.count,
      totalPrice,
    });
  });

  sequelize.transaction({ autocommit: false })
    .then(async (T: Transaction) => {
      try {
        const nowUser: User = await User.findOne({
          where: { pk: user.pk },
          transaction: T,
          lock: Transaction.LOCK.UPDATE,
        });

        if (!nowUser || nowUser.money < moneyToPay) {
          next(new CustomError({ name: 'Payment_Lack_Money' }));
          T.rollback();

          return;
        }

        const moneyBefore = nowUser.money;
        nowUser.money -= moneyToPay;
        const futureUser = await nowUser.save({ transaction: T });

        await T.commit();

        const receipt: Receipt = await Receipt.create({
          user_pk: user.pk,
          shop_pk: shop.pk,
          shop_name: shop.name,
          moneyBefore: moneyBefore,
          moneyAfter: futureUser.money,
          price: moneyToPay,
          receiptItem: _.map(itemsToPay, (item: Item) => ({
            shop_pk,
            shopItem_pk: item.pk,
            name: item.name,
            count: item.count,
            totalPrice: item.totalPrice
          })),
        }, {
          include: [{
            model: ReceiptItem,
          }],
        });

        res.json({
          success: true,
          data: {
            user: {
              money: futureUser.money,
            },
            receipt: {
              pk: receipt.pk,
              shop_pk: receipt.shop_pk,
              shop_name: receipt.shop_name,
              moneyBefore: receipt.moneyBefore,
              moneyAfter: receipt.moneyAfter,
              price: receipt.price,
              receiptItem: receipt.receiptItem,
              updatedAt: receipt.updatedAt,
              createdAt: receipt.createdAt,
              confirm: false,
              cancel: false,   
            },
          },
        });
      } catch (error) {
        console.log(error);
        T.rollback();
        next(new CustomError({ name: 'Database_Error' }));
      }
    });
};

export default postPurchase;
