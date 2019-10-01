import { Router } from "express";

import checkValidation from "@Middleware/common/checkValidation";
import verifyToken from "@Middleware/common/verifyToken";
import getShopValidation from "@Middleware/shop/get/_validation";
import postPurchaseValidation from "@Middleware/shop/purchsae/post/_validation";

// Get
import getShop from "@Middleware/shop/get/getShop";
import getPurchase from "@Middleware/shop/purchsae/get/getPurchase";

// Post
import postPurchase from '@Middleware/shop/purchsae/post/postPurchase';

const shopController: Router = Router();

shopController.use(verifyToken);

shopController.get('/', getShopValidation);
shopController.post('/purchase', postPurchaseValidation);

shopController.use(checkValidation)

shopController.get('/', getShop);
shopController.get('/purchase', getPurchase);
shopController.post('/purchase', postPurchase);

export default shopController;
