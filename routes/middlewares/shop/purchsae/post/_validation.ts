import { ValidationChain, body } from "express-validator";
import * as _ from 'lodash'

import Shop from "@Model/shop.model";
import ShopItem from "@Model/shopItem.model";
import ReceiptItem from "@Model/receiptItem.model";

import { RequestHeaderWithToken } from "@Lib/types";

interface Item {
  pk: ShopItem['pk'];
  count: ReceiptItem['count'];
}

export type PostPurchaseRequest = {
  body: {
    shop_pk: Shop['pk'];
    items: Array<Item>
  };
} & RequestHeaderWithToken;

const postPurchaseValidation: ValidationChain[] = [
  body('shop_pk').isInt({ min: 1 }),
  body('items').isArray({ min: 1 }).custom((items: Array<any>) => {
    return _.every(items, (item: any) => {
      if (typeof item !== 'object') return;
      if (typeof item.pk !== 'number' || !Number.isInteger(item.pk)) return;
      if (typeof item.count !== 'number' || !Number.isInteger(item.count)) return;
      
      return true;
    });
  }).custom((items: Array<Item>) => {
    if (_.uniqBy(items, item => item.pk).length !== items.length) return;

    return true;
  })
];

export default postPurchaseValidation;
