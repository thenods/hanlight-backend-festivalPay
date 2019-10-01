import { Request, Response, NextFunction } from "express";
import { FindOptions } from "sequelize/types";
import * as _ from 'lodash';

import Shop from "@Model/shop.model";
import ShopItem from "@Model/shopItem.model";
import Receipt from "@Model/receipt.model";
import ReceiptItem from "@Model/receiptItem.model";

import CustomError from "@Middleware/error/customError";

import { GetShopRequest, Sort } from "./_validation";

interface ShopResponse {
  pk: Shop['pk'];
  className: Shop['className'];
  name: Shop['name'];
  location: Shop['location'];
  shopItem: Shop['shopItem'];
}

const getShop = async (req: Request, res: Response, next: NextFunction) => {
  const { sort }: GetShopRequest['query'] = req.query;

  let options: FindOptions;
  if (sort === Sort.default) {
    options = {
      order: [['location', 'ASC']],
    };
  } else if (sort === Sort.popular) {
    options = {
      include: [{
        model: ShopItem,
      }, {
        model: ReceiptItem,
      }],
    }
  } else {
    options = {
      include: [{
        model: ShopItem,
      },{
        model: Receipt,
      }],
    };
  }

  try {
    const shop: Shop[] = await Shop.findAll({
      include: [{
        model: ShopItem,
        attributes: ['pk', 'name', 'price'],
      }],
      ...options,
    });

    let sortedShop: Shop[];
    if (sort === Sort.default) {
      sortedShop = shop;
    } else if (sort === Sort.popular) {
      sortedShop = _.sortBy(shop, (shop: Shop) => 
        _.reduce(shop.receiptItem, (prevItem, currentItem) => prevItem.count + currentItem.count));
    } else {
      sortedShop = _.sortBy(shop, (shop: Shop) => 
        _.reduce(shop.receipt,(prevItem, currentItem) => prevItem.price + currentItem.price));
    }

    const result: { [location: string]: Shop[] } = {};

    _.sortedUniq(_.map(sortedShop, (shop: Shop) => shop.location))
      .forEach((location: number) => result[location] = _.filter(sortedShop, (shop: Shop) => shop.location === location));

    const sortedResult: { [location: string]: ShopResponse[] } = {};
    Object.keys(result).forEach((location: string) => {
      sortedResult[location] = result[location].map(shop => ({
        pk: shop.pk,
        className: shop.className,
        name: shop.name,
        location: shop.location,
        shopItem: shop.shopItem,
      }));
    });

    res.json({
      success: true,
      data: {
        shop: sortedResult,
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getShop;
