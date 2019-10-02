import { ValidationChain, query } from "express-validator";

import { RequestHeaderWithToken } from "@Lib/types";

export enum Sort {
  default = 'default',
  popular = 'popular',
  sale = 'sale',
}

export type GetShopRequest = {
  query: {
    sort?: Sort,
  }
} & RequestHeaderWithToken;

const getShopValidation: ValidationChain[] = [
  query('sort').isString().custom(val => Object.keys(Sort).includes(val)),
];

export default getShopValidation;
